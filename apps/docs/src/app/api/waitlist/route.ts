import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { getDb } from '@/lib/db'
import { waitlist } from '../../../../drizzle/schema'
import { WaitlistConfirmationEmail } from '@/emails/waitlist-confirmation'

const resendFrom = process.env.RESEND_FROM ?? 'Pixel UI <pixel-ui@amansagar.in>'
let resendClient: Resend | null = null
let ratelimitClient: Ratelimit | null = null

function getResend() {
  if (resendClient) {
    return resendClient
  }

  const resendKey = process.env.RESEND_API_KEY ?? process.env['resend-api-key']
  if (!resendKey) {
    return null
  }

  resendClient = new Resend(resendKey)
  return resendClient
}

function getRatelimit() {
  if (ratelimitClient) {
    return ratelimitClient
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!redisUrl || !redisToken) {
    return null
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  })

  ratelimitClient = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'),
  })

  return ratelimitClient
}

function normalizeMailResponse(mailResult: unknown) {
  if (mailResult && typeof mailResult === 'object' && 'data' in mailResult) {
    const data = (mailResult as { data?: { id?: string | null } }).data
    return {
      id: data?.id ?? null,
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  const requestId = nanoid(8)

  try {
    const db = getDb()
    const { email } = await request.json()

    if (!email) {
      console.warn('waitlist validation failed', { requestId, reason: 'missing_email' })
      return NextResponse.json(
        { error: 'Email is required.', requestId },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn('waitlist validation failed', { requestId, reason: 'invalid_email', email })
      return NextResponse.json(
        { error: 'Please enter a valid email address.', requestId },
        { status: 400 }
      )
    }

    const ratelimit = getRatelimit()
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
      const result = await ratelimit.limit(ip)

      if (!result.success) {
        console.warn('waitlist rate limited', { requestId, ip })
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.', requestId },
          { status: 429 }
        )
      }
    }

    const existing = await db.select({ id: waitlist.id }).from(waitlist).where(eq(waitlist.email, email)).limit(1)

    if (existing.length > 0) {
      console.info('waitlist duplicate signup', { requestId, email })
      return NextResponse.json(
        { error: 'This email is already on the waitlist.', requestId },
        { status: 409 }
      )
    }

    await db.insert(waitlist).values({ email })
    console.info('waitlist signup saved', { requestId, email })

    const resend = getResend()
    if (!resend) {
      console.warn('waitlist email skipped because RESEND_API_KEY is not set', { requestId, email })
      return NextResponse.json({
        success: true,
        requestId,
        mailStatus: 'skipped',
        mailProviderResponse: null,
      })
    }

    try {
      if (resendFrom.toLowerCase().includes('@gmail.com')) {
        console.warn('waitlist sender is gmail-based; verify a domain in Resend for better deliverability', {
          resendFrom,
        })
      }

      const mailResult = await resend.emails.send({
        from: resendFrom,
        to: [email],
        subject: "You're on the Pixel UI waitlist!",
        react: React.createElement(WaitlistConfirmationEmail, { email }),
      })
      console.info('waitlist confirmation email sent', {
        requestId,
        email,
        mailId: mailResult.data?.id ?? null,
      })

      return NextResponse.json({
        success: true,
        requestId,
        mailStatus: 'sent',
        mailId: mailResult.data?.id ?? null,
        mailProviderResponse: normalizeMailResponse(mailResult),
      })
    } catch (emailError) {
      console.error('waitlist email failure', { requestId, email, error: emailError })

      console.info('waitlist signup completed without email delivery', {
        requestId,
        email,
        mailStatus: 'failed',
      })

      return NextResponse.json({
        success: true,
        requestId,
        mailStatus: 'failed',
        mailProviderResponse: null,
      })
    }
  } catch (error) {
    console.error('waitlist signup failure', { requestId, error })

    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('DATABASE_URL is not set')) {
      return NextResponse.json(
        {
          error: 'Waitlist storage is not configured. Please add DATABASE_URL in Vercel.',
          requestId,
          mailStatus: 'failed',
          mailProviderResponse: null,
        },
        { status: 503 }
      )
    }

    if (message.includes('UPSTASH_REDIS_REST_URL') || message.includes('UPSTASH_REDIS_REST_TOKEN')) {
      return NextResponse.json(
        {
          error: 'Waitlist rate limiting is not configured. Please add the Upstash env vars in Vercel.',
          requestId,
          mailStatus: 'failed',
          mailProviderResponse: null,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to save your details. Please try again.',
        requestId,
        mailStatus: 'failed',
        mailProviderResponse: null,
      },
      { status: 500 }
    )
  }
}

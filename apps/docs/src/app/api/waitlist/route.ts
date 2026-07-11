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

const resendKey = process.env.RESEND_API_KEY ?? process.env['resend-api-key']
const resend = new Resend(resendKey)
const resendFrom = process.env.RESEND_FROM ?? 'Pixel UI <pixel-ui@amansagar.in>'

function normalizeMailResponse(mailResult: unknown) {
  if (mailResult && typeof mailResult === 'object' && 'data' in mailResult) {
    const data = (mailResult as { data?: { id?: string | null } }).data
    return {
      id: data?.id ?? null,
    }
  }

  return null
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
})

export async function POST(request: NextRequest) {
  const requestId = nanoid(8)
  const db = getDb()

  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const result = await ratelimit.limit(ip)

    if (!result.success) {
      console.warn('waitlist rate limited', { requestId, ip })
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', requestId },
        { status: 429 }
      )
    }

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

      return NextResponse.json({
        success: true,
        requestId,
        mailStatus: 'failed',
        mailProviderResponse: null,
      })
    }
  } catch (error) {
    console.error('waitlist signup failure', { requestId, error })
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

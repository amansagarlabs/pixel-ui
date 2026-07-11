'use client'

import { useState, useEffect, useCallback } from 'react'
import { Toaster, toast } from 'sonner'
import { BrandBadge } from '@/components/brand-mark'
import { GITHUB_REPO_URL, GITHUB_STARS } from '@/components/github-stats'

function FlickeringGrid() {
  const [squares, setSquares] = useState<{ x: number; y: number; opacity: number; delay: number }[]>([])

  useEffect(() => {
    const cols = 50
    const rows = 30
    const size = 4
    const gap = 6
    const grid: { x: number; y: number; opacity: number; delay: number }[] = []

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.35) continue
        grid.push({
          x: i * (size + gap),
          y: j * (size + gap),
          opacity: Math.random() * 0.4 + 0.05,
          delay: Math.random() * 8,
        })
      }
    }
    setSquares(grid)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {squares.map((sq, i) => (
          <rect
            key={i}
            x={sq.x}
            y={sq.y}
            width={4}
            height={4}
            rx={0.5}
            fill="currentColor"
            className="text-foreground/[0.07]"
            opacity={sq.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${sq.opacity};${sq.opacity * 0.2};${sq.opacity}`}
              dur={`${3 + sq.delay}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
    </div>
  )
}

function useCountdown(targetDate: Date) {
  const calc = useCallback(() => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [targetDate])

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  return time
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
]

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const countdown = useCountdown(new Date('2027-01-01T00:00:00'))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setLoading(true)

    const promise = fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      return data
    })

    toast.promise(promise, {
      loading: 'Getting you on the waitlist...',
      success: (data) => {
        setEmail('')
        setAlreadyJoined(false)
        setSubmitted(true)
        return data?.mailStatus === 'sent'
          ? "You're on the list! Confirmation email sent."
          : "You're on the list. Confirmation email could not be sent."
      },
      error: (err) => {
        if (err.message === 'This email is already on the waitlist.') {
          setEmail('')
          setSubmitted(false)
          setAlreadyJoined(true)
          return 'You are already on the waitlist.'
        }
        setAlreadyJoined(false)
        return err.message || 'Something went wrong. Please try again.'
      },
    })

    promise.finally(() => setLoading(false))
  }

  return (
    <>
      <Toaster
        position="top-center"
        theme="dark"
        richColors={false}
        toastOptions={{
          className:
            'border border-border bg-background/95 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md',
          style: {
            borderRadius: '14px',
          },
        }}
        style={{
          '--normal-bg': 'hsl(var(--background))',
          '--normal-text': 'hsl(var(--foreground))',
          '--success-bg': 'hsl(var(--background))',
          '--success-text': 'hsl(var(--foreground))',
          '--error-bg': 'hsl(var(--background))',
          '--error-text': 'hsl(var(--foreground))',
        } as React.CSSProperties}
      />
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10 text-foreground">
        <FlickeringGrid />

        <div className="relative z-10 flex flex-col items-center gap-7 text-center">
          <BrandBadge />

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1">
            <span className="size-1.5 rounded-full bg-foreground" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Launching in a few weeks
            </span>
          </div>

          <h1 className="text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
            Join the waitlist
          </h1>

          <p className="max-w-md text-balance text-[15px] leading-7 text-muted-foreground">
            Be the first to know when we launch. Get exclusive early access and special benefits.
          </p>

          <div className="flex items-center justify-center">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-10 items-stretch overflow-hidden rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              <span className="flex items-center gap-2 border-r border-border px-3.5 leading-none transition-colors group-hover:bg-muted/40">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0.9 10.1 5l4.5.7-3.2 3.1.8 4.4L8 11.1l-4.2 2.1.8-4.4L1.4 5.7 5.9 5 8 .9Z" />
                </svg>
                Star
              </span>
              <span className="flex items-center px-3.5 leading-none text-muted-foreground transition-colors group-hover:text-foreground">
                {GITHUB_STARS}
              </span>
            </a>
          </div>

          {submitted || alreadyJoined ? (
            <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-background/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {alreadyJoined ? 'Already on the list' : "You're on the list"}
              </div>
              <div className="space-y-2 text-center">
                <p className="text-base font-medium text-foreground">
                  {alreadyJoined ? 'You already signed up' : 'Confirmation email sent'}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {alreadyJoined
                    ? 'We already have this email on the waitlist.'
                    : `Check ${email || 'your inbox'} for the confirmation mail and launch updates.`}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-[30rem] flex-col gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-1 h-11 rounded-lg border border-border bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>
          )}

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="size-7 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">12,500+</span> people already signed up
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {unit.label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="pb-5 text-xl font-light text-muted-foreground/40">:</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Time remaining until launch
          </div>
        </div>
      </div>
    </>
  )
}

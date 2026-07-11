'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Clock3, Mail } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'

const launchDate = new Date('2027-01-15T00:00:00+05:30').getTime()

function getRemainingTime() {
  const difference = Math.max(0, launchDate - Date.now())

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function PixelMark() {
  return (
    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white text-black shadow-2xl shadow-lime-400/10">
      <svg
        aria-hidden="true"
        viewBox="0 0 28 28"
        className="size-8"
        fill="currentColor"
        shapeRendering="crispEdges"
      >
        <rect x="4" y="4" width="4" height="20" />
        <rect x="8" y="4" width="12" height="4" />
        <rect x="20" y="8" width="4" height="8" />
        <rect x="8" y="16" width="12" height="4" />
        <rect x="8" y="8" width="4" height="8" fill="transparent" />
      </svg>
    </div>
  )
}

function AvatarStack() {
  const avatars = ['AS', 'UI', 'AI', 'DX', 'TS']

  return (
    <div className="flex -space-x-2">
      {avatars.map((avatar, index) => (
        <span
          key={avatar}
          className="flex size-8 items-center justify-center rounded-full border border-black bg-white text-[10px] font-semibold text-black"
          style={{ zIndex: avatars.length - index }}
        >
          {avatar}
        </span>
      ))}
    </div>
  )
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemainingTime)
  const units = useMemo(
    () => [
      ['Days', remaining.days],
      ['Hours', remaining.hours],
      ['Minutes', remaining.minutes],
      ['Seconds', remaining.seconds],
    ],
    [remaining]
  )

  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(getRemainingTime()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto mt-9 w-full max-w-[380px]">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-3">
        {units.map(([label, value], index) => (
          <div key={label} className="contents">
            <div className="text-center">
              <div className="font-mono text-2xl font-semibold tracking-tight text-white">
                {String(value).padStart(2, '0')}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                {label}
              </div>
            </div>
            {index < units.length - 1 ? (
              <div className="pt-1 font-mono text-xl text-white/45">:</div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
        <Clock3 size={14} />
        Early registry access opens soon
      </div>
    </div>
  )
}

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-12 text-center text-white">
      <PixelMark />

      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
        <span className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_16px_rgba(190,242,100,0.9)]" />
        Private beta opening in 2027
      </div>

      <h1 className="mt-8 max-w-[920px] text-balance text-[clamp(3.25rem,8vw,7.75rem)] font-black leading-[0.84] tracking-[-0.07em] text-white">
        Join the
        <br />
        waitlist
      </h1>

      <p className="mt-7 max-w-[620px] text-pretty text-base leading-7 text-white/65 sm:text-lg">
        Pixel UI is the source-first registry for agentic interfaces. Get early access to installable chat,
        reasoning, tool-call, memory, and guardrail components before public launch.
      </p>

      <form
        className="mt-9 flex w-full max-w-[540px] flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          if (email.trim()) {
            setSubmitted(true)
          }
        }}
      >
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <div className="group relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="h-12 w-full rounded-lg border border-white/15 bg-white/[0.07] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-lime-300/70 focus:bg-white/[0.1] focus:ring-4 focus:ring-lime-300/10"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
        >
          {submitted ? 'You are in' : 'Join waitlist'}
          {submitted ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>

      {submitted ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1.5 text-sm text-lime-100">
          <Check size={15} />
          You have been added to the Pixel UI launch list.
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/55">
        <AvatarStack />
        <span>
          <strong className="font-semibold text-white">1,500+</strong> builders tracking the launch
        </span>
      </div>

      <Countdown />

      <div className="mt-14 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
        {[
          ['Copy Source', 'Install components through shadcn and own the runtime.'],
          ['Agent Native', 'Chat, reasoning, tools, memory, and guardrails first.'],
          ['Registry Ready', 'Public JSON today, private namespaces later.'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/[0.045] p-4 text-left backdrop-blur">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime-200/80">{title}</div>
            <p className="mt-3 text-sm leading-6 text-white/58">{description}</p>
          </div>
        ))}
      </div>

      <a
        href="https://github.com/amansagar070707-crypto/pixel-ui"
        className="mt-10 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
      >
        <IconBrandGithub size={15} stroke={1.8} />
        Follow the build on GitHub
      </a>
    </div>
  )
}

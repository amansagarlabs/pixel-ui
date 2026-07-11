'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'
import Marquee from 'react-fast-marquee'
import {
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import { PageShell, SectionFrame } from '@/components/layout/page-frame'
import { LogosCarousel } from '@/components/logos-carousel'
import {
  ChainOfThoughtPreview,
  ConversationPreview,
  MessagePreview,
  PlanPreview,
  PromptInputPreview,
  QueuePreview,
  TerminalPreview,
} from '@/components/ai-elements-preview'
import { aiElementComponents, componentRegistry } from '@/lib/component-registry'

const FEATURE_BENTO = [
  {
    eyebrow: 'REGISTRY',
    title: `${componentRegistry.length}+ AI-native components`,
    description: 'Chat, tools, terminals, reasoning traces, queues, artifacts, and prompt inputs. Each one is built as source you can inspect, own, and adapt.',
    chips: ['Chat', 'Tools', 'Memory', 'Approval', 'Telemetry'],
  },
  {
    eyebrow: 'COPY SOURCE',
    title: 'Own the agent surface',
    description: 'Every primitive lands in your repo. Change the code, wire it to your runtime, and keep control of the product behavior.',
    chips: ['No vendor lock', 'TypeScript'],
  },
  {
    eyebrow: 'CLI FLOW',
    title: 'Install like infrastructure',
    description: 'Use init, add, list, doctor, test, and upgrade to standardize how your team pulls agent primitives into production projects.',
    chips: ['7 commands'],
  },
  {
    eyebrow: 'RUNTIME',
    title: 'Built for agent engineering',
    description: 'Planner, memory, browser, evaluator, security, approval, retry, router, and context primitives map to how agent systems actually ship.',
    chips: ['Runtime', 'Eval', 'Guardrails'],
  },
]

const TESTIMONIALS = [
  {
    quote: 'I copied the tool-call card directly into our approval flow.',
    name: 'Ava Patel',
    role: 'Staff Eng, Flux',
  },
  {
    quote: 'The trace timeline reads like a real runtime surface, not a demo.',
    name: 'Mason Lee',
    role: 'Founding Dev, Orbit',
  },
  {
    quote: 'We shipped the memory recall block with almost no edits.',
    name: 'Noah Kim',
    role: 'CTO, Relay',
  },
]

function stripeSection() {
  return (
    <div
      aria-hidden="true"
      className="full-bleed-stripes h-8 border-y border-border/60 opacity-70"
    />
  )
}

function StripeDivider() {
  return (
    <div
      aria-hidden="true"
      className="full-bleed-stripes h-8 border-y border-border/60 opacity-70"
    />
  )
}

function SectionWrap({ children }: { children: ReactNode }) {
  return (
    <section className="py-8">
      <SectionFrame>{children}</SectionFrame>
    </section>
  )
}

function BentoLabel({ children }: { children: ReactNode }) {
  return <div className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{children}</div>
}

function BentoTile({
  title,
  label,
  children,
  className = '',
}: {
  title: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`min-h-56 overflow-hidden border border-border bg-background p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <BentoLabel>{label}</BentoLabel>
        <span className="font-pixel-square text-[10px] text-muted-foreground">{title}</span>
      </div>
      <div className="flex min-h-0 items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function FeatureBentoCard({
  eyebrow,
  title,
  description,
  meta,
  chips = [],
  className = '',
}: {
  eyebrow: string
  title: string
  description: string
  meta?: string
  chips?: string[]
  className?: string
}) {
  return (
    <div className={`flex min-h-48 flex-col rounded-2xl border border-border bg-background p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
        {meta ? (
          <div className="font-pixel-square text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {meta}
          </div>
        ) : null}
      </div>
      <div>
        <h3 className="mt-7 max-w-[22rem] text-xl font-semibold leading-tight text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {chips.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-md border border-border bg-secondary px-2 py-1 font-pixel-square text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ToolCallMini() {
  return (
    <div className="w-full max-w-[440px]">
      <TerminalPreview />
    </div>
  )
}

function ChatBubbleMini() {
  return (
    <div className="w-full max-w-[440px]">
      <MessagePreview />
    </div>
  )
}

function MemoryRecallMini() {
  return (
    <div className="w-full max-w-[420px]">
      <ChainOfThoughtPreview compact />
    </div>
  )
}

function AgentCanvasMini() {
  return (
    <div className="w-full max-w-[420px] origin-top scale-[0.92]">
      <PlanPreview compact />
    </div>
  )
}

function GuardrailMini() {
  return (
    <div className="w-full max-w-[420px]">
      <QueuePreview />
    </div>
  )
}

function TraceTimelineMini() {
  return (
    <div className="w-full max-w-[620px]">
      <PromptInputPreview compact />
    </div>
  )
}

function ConversationMini() {
  return (
    <div className="w-full max-w-[560px]">
      <ConversationPreview compact />
    </div>
  )
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="mx-2 w-[300px] shrink-0 rounded-2xl border border-border bg-background px-5 py-5 shadow-[0_8px_28px_rgba(0,0,0,0.04)] sm:w-[340px]">
      <p className="text-sm leading-6 text-foreground">{quote}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted font-pixel-square text-[10px] uppercase text-muted-foreground">
          {name
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </span>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  )
}

function ContributorCard({ name, handle }: { name: string; handle: string }) {
  return (
    <div className="border border-border px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full border border-border bg-muted" />
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="font-pixel-square text-xs text-muted-foreground">{handle}</div>
        </div>
      </div>
    </div>
  )
}

function UtilityCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border p-4">
      <div className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function HomePage() {
  return (
    <PageShell className="text-foreground">
      <main id="main-content" className="py-16 sm:py-20">
        <SectionFrame>
          <div className="mx-auto flex max-w-[760px] p-18 flex-col items-center">
            {/* <p className="text-center font-pixel-square text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Pixel UI&apos;s
            </p> */}
            <h1 className="mt-4 max-w-[11ch] text-center text-[clamp(2.9rem,5.5vw,5.6rem)] font-semibold uppercase leading-[1.06] tracking-[-0.02em] text-foreground">
              <span className="block">Pixel perfect</span>
              <span className="mt-3 block">agent UI</span>
            </h1>
            <p className="mt-3 text-center font-pixel-square text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              For AI-native products
            </p>
            <p className="mt-7 max-w-[600px] text-center text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {componentRegistry.length} production-ready agent primitives &mdash; chat, reasoning, tools, and memory &mdash; that make your product feel like you hired an AI infra team. Copy the source, own the runtime, no wrestling with streaming state or tool-call plumbing.
            </p>

            <div className="mt-10 flex items-center justify-center">
              <Link
                href="/components"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Browse Components
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs text-muted-foreground">
              <span className="font-pixel-square">{componentRegistry.length}+ Primitives</span>
              <span aria-hidden="true">&middot;</span>
              <span className="font-pixel-square">{aiElementComponents.length} AI-native</span>
              <span aria-hidden="true">&middot;</span>
              <span className="font-pixel-square">MIT Licensed</span>
            </div>
          </div>
        </SectionFrame>
      </main>

      {stripeSection()}

      <section className="py-12">
        <SectionFrame>
          <div className="overflow-hidden rounded-xl border border-border p-8">
            <div className="hidden">
              {[
                <svg key="posthog" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z" /></svg>,
                <svg key="studio" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M3 5h18v14H3zM6 8h12v1H6zm0 3h7v1H6zm0 3h10v1H6z" /></svg>,
                <svg key="space" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6z" /></svg>,
                <svg key="craft" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2l8 5v10l-8 5-8-5V7z" /></svg>,
                <svg key="vercel" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="m12 3 9 16H3z" /></svg>,
                <svg key="next" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2a10 10 0 1 0 0 20V2zm0 20a10 10 0 0 0 0-20v20z" /></svg>,
                <svg key="tailwind" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 6c-3.3 0-5 1.7-5.5 5 .9-1.2 2-1.8 3.3-1.8.9 0 1.7.3 2.3.9.8.7 1.6 1.9 3.1 1.9 3.3 0 5-1.7 5.5-5-.9 1.2-2 1.8-3.3 1.8-.9 0-1.7-.3-2.3-.9-.8-.7-1.6-1.9-3.1-1.9zm-5.5 6c-.5 3.3 1.2 5 4.5 5 .9 0 1.7-.3 2.3-.9.8-.7 1.6-1.9 3.1-1.9 3.3 0 5 1.7 5.5 5-.9-1.2-2-1.8-3.3-1.8-.9 0-1.7.3-2.3.9-.8.7-1.6 1.9-3.1 1.9-3.3 0-5-1.7-5.5-5 .9 1.2 2 1.8 3.3 1.8.9 0 1.7-.3 2.3-.9.8-.7 1.6-1.9 3.1-1.9 3.3 0 5-1.7 5.5-5-.9 1.2-2 1.8-3.3 1.8-.9 0-1.7-.3-2.3-.9-.8-.7-1.6-1.9-3.1-1.9-3.3 0-5 1.7-5.5 5z" /></svg>,
                <svg key="radix" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2a4 4 0 0 1 4 4v2h-4V2zm-6 6h4v12a6 6 0 1 1-4-12zM18 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" /></svg>,
              ].map((icon, index) => (
                <div key={index} className="flex h-14 items-center justify-center rounded-xl border border-border bg-background">
                  {icon}
                </div>
              ))}
            </div>
            <LogosCarousel columnCount={2} className="h-12 md:hidden">
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-muted-foreground"><path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">PostHog</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M3 5h18v14H3zM6 8h12v1H6zm0 3h7v1H6zm0 3h10v1H6z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadcnstudio</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadnspace.</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2l8 5v10l-8 5-8-5V7z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadcncraft</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="m12 3 9 16H3z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Vercel</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-muted-foreground"><path d="M12 2a10 10 0 1 0 0 20V2zm0 20a10 10 0 0 0 0-20v20z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Next.js</span>
              </div>
            </LogosCarousel>
            <LogosCarousel columnCount={4} className="hidden h-12 md:grid">
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-muted-foreground"><path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">PostHog</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" /></svg>
                <div className="flex flex-col">
                  <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadcnstudio</span>
                  <span className="text-[10px] text-muted-foreground/60">blocks & templates</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-code text-xs font-bold">●</span>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadnspace.</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.31L5.66 8v8l6.34 3.69L18.34 16V8l-6.34-3.69z" /></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">shadcncraft</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="m12 1.608 12 20.784H0Z"/></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Vercel</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-muted-foreground"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Next.js</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Tailwind</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-muted-foreground"><path d="M11.52 24a7.68 7.68 0 0 1-7.68-7.68 7.68 7.68 0 0 1 7.68-7.68V24Zm0-24v7.68H3.84V0h7.68Zm4.8 7.68a3.84 3.84 0 1 1 0-7.68 3.84 3.84 0 0 1 0 7.68Z"/></svg>
                <span className="font-pixel-square text-sm font-medium text-muted-foreground">Radix</span>
              </div>
            </LogosCarousel>
          </div>
        </SectionFrame>
      </section>

      {stripeSection()}

      <section className="py-12">
        <SectionFrame>
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div className="max-w-sm">
              <p className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Feature bento
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Agent UI that ships with the runtime.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:justify-self-end">
              Pixel UI is a shadcn-style registry for AI agent engineering: composable UI, runtime primitives, and source code your team can actually own.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-12">
            {FEATURE_BENTO.map((feature, index) => (
              <FeatureBentoCard
                key={feature.title}
                {...feature}
                meta={index === 0 ? 'UI + runtime' : index === 2 ? '7 commands' : undefined}
                className={
                  index === 0
                    ? 'md:col-span-7 md:min-h-64'
                    : index === 1
                      ? 'md:col-span-5 md:min-h-64'
                      : 'md:col-span-6 md:min-h-44'
                }
              />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Start from the registry
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Pick a primitive, copy the source, and adapt it to your agent workflow.
              </p>
            </div>
            <Link
              href="/components"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Browse components
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </SectionFrame>
      </section>

      {stripeSection()}

      <section className="py-12">
        <SectionFrame>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-foreground">Pixel UI</p>
              <p className="mt-1 max-w-[620px] text-sm leading-6 text-muted-foreground">
                Real composable AI agent components for chat, reasoning, tools, memory, and guardrails.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
              <CheckCircle2 size={14} />
              {aiElementComponents.length} installed
            </span>
          </div>

          <h2 className="mt-8 text-left text-base font-semibold text-foreground">Bento showcase</h2>
          <div className="mt-4 overflow-hidden rounded-3xl border bg-border">
            <div className="grid grid-cols-1 gap-px lg:grid-cols-2">
            <BentoTile title="$ pixel-ui add approval" label="Install">
              <ToolCallMini />
            </BentoTile>
            <BentoTile title="Message" label="I/O surface">
              <ChatBubbleMini />
            </BentoTile>
            <BentoTile title="Chain of thought" label="Reasoning">
              <MemoryRecallMini />
            </BentoTile>
            <BentoTile title="Prompt Input" label="Composer" className="min-h-80">
              <TraceTimelineMini />
            </BentoTile>
            <BentoTile title="Plan" label="Reasoning">
              <AgentCanvasMini />
            </BentoTile>
            <BentoTile title="Queue" label="I/O surface">
              <GuardrailMini />
            </BentoTile>
            <BentoTile title="Conversation" label="Chat" className="min-h-80 lg:col-span-2">
              <ConversationMini />
            </BentoTile>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Link
              href="/components"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border bg-foreground px-3 text-xs font-medium text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View more
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </SectionFrame>
      </section>

      <StripeDivider />

      <SectionWrap>
        <div className="w-full overflow-hidden">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Testimonials marquee
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Used in real agent workflows.</h2>
            </div>
          </div>
          <div className="relative -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee autoFill pauseOnHover speed={34} gradient={false}>
              {TESTIMONIALS.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>
      </SectionWrap>

      <StripeDivider />
    </PageShell>
  )
}

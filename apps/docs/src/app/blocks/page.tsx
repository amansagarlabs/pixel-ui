'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'

import { FooterCredits, Skyline } from '@/app/components/page'
import {
  SectionFrame,
} from '@/components/layout/page-frame'

type BlockItem = {
  slug: string
  title: string
  date: string
  tag: string
}

const blocks: BlockItem[] = [
  {
    slug: 'agent-dashboard-hero-block',
    title: 'Agent dashboard hero block',
    date: '24.07.2026',
    tag: 'Hero section',
  },
  {
    slug: 'multi-agent-status-grid',
    title: 'Multi-agent status grid',
    date: '21.07.2026',
    tag: 'Ops grid',
  },
  {
    slug: 'approval-queue-block',
    title: 'Approval queue block',
    date: '18.07.2026',
    tag: 'Workflow',
  },
  {
    slug: 'trace-timeline-section',
    title: 'Trace timeline section',
    date: '16.07.2026',
    tag: 'Trace view',
  },
  {
    slug: 'pricing-plan-comparison-block',
    title: 'Pricing/plan comparison block',
    date: '12.07.2026',
    tag: 'Pricing',
  },
  {
    slug: 'onboarding-stepper-block',
    title: 'Onboarding stepper block',
    date: '08.07.2026',
    tag: 'Onboarding',
  },
]

function AgentDashboardHeroPreview() {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-3">
        <div className="h-2 w-20 bg-border" />
        <div className="max-w-[240px] space-y-2">
          <div className="h-5 w-40 bg-foreground/90" />
          <div className="h-2 w-56 bg-border" />
          <div className="h-2 w-44 bg-border" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-16 border border-border bg-card" />
        <div className="h-16 border border-border bg-card" />
        <div className="h-16 border border-border bg-card" />
      </div>
    </div>
  )
}

function MultiAgentStatusPreview() {
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-4">
      {['Planner', 'Research', 'Browser', 'Approval'].map((item, index) => (
        <div key={item} className="flex flex-col justify-between border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{item}</div>
            <div className={`h-2 w-2 rounded-full ${index % 2 === 0 ? 'bg-foreground' : 'bg-muted-foreground'}`} />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-16 bg-border" />
            <div className="h-2 w-12 bg-border" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ApprovalQueuePreview() {
  return (
    <div className="space-y-2 p-4">
      {['Policy update', 'Billing access', 'Deploy production'].map((item, index) => (
        <div key={item} className="flex items-center justify-between border border-border bg-card px-3 py-3">
          <div className="space-y-1">
            <div className="text-sm text-foreground">{item}</div>
            <div className="h-2 w-24 bg-border" />
          </div>
          <div className={`border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${index === 0 ? 'border-foreground text-foreground' : 'border-border text-muted-foreground'}`}>
            {index === 0 ? 'urgent' : 'pending'}
          </div>
        </div>
      ))}
    </div>
  )
}

function TraceTimelinePreview() {
  return (
    <div className="space-y-3 p-4">
      {['Prompt received', 'Planner split task', 'Browser returned result', 'Response streamed'].map((item, index) => (
        <div key={item} className="grid grid-cols-[18px_1fr] items-start gap-3">
          <div className="mt-1 flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-foreground" />
            {index < 3 ? <div className="mt-1 h-8 w-px bg-border" /> : null}
          </div>
          <div className="border border-border bg-card px-3 py-2">
            <div className="text-sm text-foreground">{item}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PricingPreview() {
  return (
    <div className="grid h-full grid-cols-3 gap-px bg-border">
      {['Starter', 'Team', 'Scale'].map((tier, index) => (
        <div key={tier} className={`flex flex-col justify-between bg-card p-4 ${index === 1 ? 'bg-accent' : ''}`}>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">{tier}</div>
            <div className="text-lg font-semibold text-foreground">${index === 0 ? '19' : index === 1 ? '79' : '199'}</div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-full bg-border" />
            <div className="h-2 w-5/6 bg-border" />
            <div className="h-2 w-2/3 bg-border" />
          </div>
        </div>
      ))}
    </div>
  )
}

function OnboardingPreview() {
  return (
    <div className="flex h-full items-center p-5">
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div className={`flex h-7 w-7 items-center justify-center border text-xs ${index === 0 ? 'border-foreground text-foreground' : 'border-border text-muted-foreground'}`}>
                {step}
              </div>
              {index < 3 ? <div className="h-px flex-1 bg-border" /> : null}
            </div>
          ))}
        </div>
        <div className="border border-border bg-card p-4">
          <div className="h-3 w-28 bg-border" />
          <div className="mt-3 h-2 w-40 bg-border" />
          <div className="mt-2 h-2 w-52 bg-border" />
        </div>
      </div>
    </div>
  )
}

function BlockPreview({ slug }: { slug: string }) {
  const common = 'relative aspect-[16/10] border-b border-border bg-background'

  switch (slug) {
    case 'agent-dashboard-hero-block':
      return <div className={common}><AgentDashboardHeroPreview /></div>
    case 'multi-agent-status-grid':
      return <div className={common}><MultiAgentStatusPreview /></div>
    case 'approval-queue-block':
      return <div className={common}><ApprovalQueuePreview /></div>
    case 'trace-timeline-section':
      return <div className={common}><TraceTimelinePreview /></div>
    case 'pricing-plan-comparison-block':
      return <div className={common}><PricingPreview /></div>
    case 'onboarding-stepper-block':
      return <div className={common}><OnboardingPreview /></div>
    default:
      return <div className={common} />
  }
}

function BlockCard({ block }: { block: BlockItem }) {
  return (
    <Link
      href={`/blocks/${block.slug}`}
      className="group block overflow-hidden border border-border bg-card transition-colors hover:bg-accent/20"
    >
      <BlockPreview slug={block.slug} />
      <div className="space-y-1 px-1 py-3">
        <h2 className="text-[15px] font-semibold leading-6 tracking-tight text-foreground">
          {block.title}
        </h2>
        <div className="text-xs text-muted-foreground">
          {block.date} / {block.tag}
        </div>
      </div>
    </Link>
  )
}

export default function BlocksPage() {
  const [query, setQuery] = useState('')
  const filtered = blocks.filter((block) =>
    block.title.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-10 sm:py-14">
        <div className="mx-auto max-w-[680px] space-y-5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Pixel UI&apos;s
          </p>
          <h1 className="mx-auto max-w-[14ch] text-[clamp(2.9rem,5.5vw,5.6rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-foreground">
            Ready-made
            <br />
            agent sections
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Drop in and ship
          </p>
          <p className="mx-auto max-w-[600px] text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Pre-built compositions &mdash; dashboards, approval queues, trace views &mdash; assembled from Pixel UI primitives. Copy the block, wire your data, done.
          </p>
        </div>

        <label className="relative block">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks..."
            className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
          />
        </label>
      </SectionFrame>

      <SectionFrame>
        <div className="grid gap-px bg-border py-4 sm:grid-cols-2">
          {filtered.map((block) => (
            <BlockCard key={block.slug} block={block} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
            No blocks match that search.
          </div>
        ) : null}
      </SectionFrame>

      <div className="mt-8 border-t border-border/60 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_7px,rgba(255,255,255,0.04)_7px,rgba(255,255,255,0.04)_8px)] py-2 opacity-60" />
      <FooterCredits />
      <div className="mt-6">
        <Skyline />
      </div>
    </article>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { FooterCredits, Skyline } from '@/app/components/page'
import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

const blockSlugs = new Set([
  'agent-dashboard-hero-block',
  'multi-agent-status-grid',
  'approval-queue-block',
  'trace-timeline-section',
  'pricing-plan-comparison-block',
  'onboarding-stepper-block',
])

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function generateStaticParams() {
  return Array.from(blockSlugs).map((slug) => ({ slug }))
}

export default async function BlockDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!blockSlugs.has(slug)) {
    notFound()
  }

  const title = titleFromSlug(slug)

  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-8 py-8 sm:py-10">
        <div className="space-y-4">
          <p className="font-medium text-muted-foreground">Blocks / {title}</p>
          <h1 className={PAGE_TITLE_CLASS}>{title}</h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Block detail pages are stubbed for now. This route is ready for the shared block-detail template when you want it.
          </p>
        </div>

        <div className="border border-border bg-card p-5">
          <Link href="/blocks" className="text-sm text-foreground underline underline-offset-4">
            Back to Blocks
          </Link>
        </div>
      </SectionFrame>

      <div className="mt-8 border-t border-border/60 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_7px,rgba(255,255,255,0.04)_7px,rgba(255,255,255,0.04)_8px)] py-2 opacity-60" />
      <FooterCredits />
      <div className="mt-6">
        <Skyline />
      </div>
    </article>
  )
}

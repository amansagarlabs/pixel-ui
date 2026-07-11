import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  PageShell,
  SectionFrame,
} from '@/components/layout/page-frame'

const roadmap = [
  {
    phase: 'Now',
    title: 'Stabilize the launch surface',
    summary:
      'Lock the docs, waitlist, changelog, and registration flow so the public launch stays predictable.',
    items: [
      'Finish the waitlist email sender verification on amansagar.in.',
      'Keep the changelog current with patch-level notes.',
      'Validate the docs navigation, footer links, and launch pages.',
    ],
  },
  {
    phase: 'Next',
    title: 'Ship the registry and install flow',
    summary:
      'Make the component registry easier to browse, install, and understand from source.',
    items: [
      'Expand the registry API pages with examples and installation commands.',
      'Add more primitives and package them with stronger defaults.',
      'Document the CLI and registry sync workflow more clearly.',
    ],
  },
  {
    phase: 'Later',
    title: 'Add production observability',
    summary:
      'Layer in the operational pieces that matter after launch: analytics, feedback loops, and metrics.',
    items: [
      'Track waitlist conversion and docs engagement.',
      'Add a lightweight roadmap or status board for public updates.',
      'Capture launch feedback and iterate on the design language.',
    ],
  },
]

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  )
}

export default function RoadmapPage() {
  return (
    <PageShell>
      <article className="text-foreground">
        <SectionFrame className="space-y-10 py-16 sm:py-20">
          <div className="max-w-[760px] space-y-4">
            <p className="font-medium text-muted-foreground">Docs / Roadmap</p>
            <h1 id="roadmap" className={PAGE_TITLE_CLASS}>
              Roadmap
            </h1>
            <p className={PAGE_SUBHEAD_CLASS}>
              What ships now, next, and later.
            </p>
          </div>
        </SectionFrame>

        <SectionFrame className="space-y-4">
          <div className="max-w-[680px] py-4">
            <p className="mb-6 text-sm leading-7 text-muted-foreground">
              A production-facing roadmap for pixel-ui that keeps launch work focused and visible.
            </p>

            <div className="space-y-4">
              {roadmap.map((item) => (
                <article
                  key={item.phase}
                  className="rounded-2xl border border-border bg-background/80 p-5 shadow-[0_12px_50px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge>{item.phase}</Badge>
                    <span className="text-sm text-muted-foreground">{item.title}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>

                  <div className="mt-5 border-t border-border pt-4">
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Milestones
                    </div>
                    <ul className="space-y-3">
                      {item.items.map((point) => (
                        <li key={point} className="flex gap-2 text-sm leading-6 text-foreground">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionFrame>
      </article>
    </PageShell>
  )
}

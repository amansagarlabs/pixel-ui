import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

const releases = [
  {
    version: 'v0.1.0',
    date: 'July 2026',
    title: 'Waitlist, registry, and docs foundation',
    type: 'Launch',
    summary:
      'Shipped the first public docs experience, the waitlist gate, and the registry foundation for pixel-ui.',
    items: [
      'Added the waitlist page with email signup and confirmation mail flow.',
      'Introduced Drizzle-powered waitlist persistence and migration support.',
      'Added Resend, React Email, and Upstash rate limiting for the waitlist API.',
      'Built the proxy-based launch gate for waitlist mode and development bypass.',
    ],
  },
  {
    version: 'v0.0.9',
    date: 'July 2026',
    title: 'Docs navigation and content expansion',
    type: 'Patch',
    summary:
      'Expanded the docs layout with a better sidebar, TOC, and additional guide pages.',
    items: [
      'Added right-side TOC discovery for headings across docs pages.',
      'Expanded docs sections for registry, configuration, CLI, and guides.',
      'Refined the home page layout and simplified the header treatment.',
      'Improved the docs experience for mobile and desktop navigation.',
    ],
  },
  {
    version: 'v0.0.8',
    date: 'June 2026',
    title: 'Registry and primitive scaffolding',
    type: 'Patch',
    summary:
      'Landed the first registry structure for shipping agent UI primitives as source.',
    items: [
      'Defined the registry layout for components, schemas, prompts, and tests.',
      'Added the CLI command surface for init, add, remove, list, doctor, test, and upgrade.',
      'Started the SDK and core package foundations.',
      'Set up the launch-ready design language for the docs site.',
    ],
  },
  {
    version: 'v0.0.7',
    date: 'July 2026',
    title: 'Launch polish and production pages',
    type: 'Patch',
    summary:
      'Added the production-facing changelog and roadmap pages to keep launch work visible.',
    items: [
      'Created a centered changelog page that matches the docs system.',
      'Created a centered roadmap page that matches the docs system.',
      'Wrapped both pages in the shared PageShell so the header and centered column render correctly.',
      'Aligned shared brand and GitHub UI elements across the header and waitlist.',
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

export default function ChangelogPage() {
  return (
    <article className="text-foreground">
      <SectionFrame className="space-y-12 pt-0 pb-14 sm:pb-20">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Changelog</p>
          <h1 id="changelog" className={PAGE_TITLE_CLASS}>
            Changelog
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Production updates, patches, and launch notes.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            Track what changed in pixel-ui with release notes that stay concise, searchable, and
            readable in production.
          </p>

          <div className="space-y-4">
            {releases.map((release) => (
              <article
                key={release.version}
                className="rounded-2xl border border-border bg-background/80 p-5 shadow-[0_12px_50px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{release.type}</Badge>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {release.date}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {release.version}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight">{release.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{release.summary}</p>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Patch notes
                  </div>
                  <ul className="space-y-3">
                    {release.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                        <span className="text-muted-foreground">{item}</span>
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
  )
}

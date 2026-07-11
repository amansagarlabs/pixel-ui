import Link from 'next/link'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'
import { ArrowUpRight } from 'lucide-react'

const footerColumns = [
  {
    title: 'Registry',
    items: [
      { label: 'Components', href: '/components' },
      { label: 'Blocks', href: '/blocks' },
      { label: 'CLI', href: '/docs/cli' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Sponsors', href: '/docs/sponsors' },
    ],
  },
  {
    title: 'Project',
    items: [
      { label: 'MIT License' },
      { label: 'Vercel', href: 'https://vercel.com' },
      { label: 'PostHog', href: 'https://posthog.com' },
    ],
  },
]

function FooterPanelLink({ item }: { item: { label: string; href?: string } }) {
  if (!item.href) {
    return <span className="text-foreground">{item.label}</span>
  }

  const isExternal = item.href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link
      href={item.href}
      className="text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
    >
      {item.label}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="py-8">
      <div className="mx-auto w-full max-w-[768px] px-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid gap-px bg-border lg:grid-cols-[1fr_0.95fr]">
            <div className="bg-background p-5 sm:p-7">
              <p className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Ship from source
              </p>
              <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Build the agent interface without giving up the runtime.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                Browse the registry, install a primitive, then keep the code in your repo. Pixel UI is MIT licensed, Vercel deployed, and built for teams shipping AI products.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/components"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Browse components
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-background p-5 sm:p-7">
              <div className="overflow-hidden rounded-xl border border-border">
                <div className="grid gap-px bg-border">
                  {footerColumns.map((group) => (
                    <div
                      key={group.title}
                      className="bg-background p-5 sm:p-7"
                    >
                      <p className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {group.title}
                      </p>
                      <div className="mt-5 space-y-3 text-sm leading-5">
                        {group.items.map((item) => (
                          <div key={item.label}>
                            <FooterPanelLink item={item} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 text-center text-foreground">
          <div className="font-pixel-square text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            pixel-ui / MIT / source-first agent interfaces
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#" aria-label="X/Twitter" className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-secondary">
              <IconBrandX size={21} stroke={1.8} />
            </a>
            <a href="https://github.com/amansagar070707-crypto/pixel-ui" aria-label="GitHub" className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-secondary">
              <IconBrandGithub size={21} stroke={1.8} />
            </a>
            <a href="#" aria-label="LinkedIn" className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-secondary">
              <IconBrandLinkedin size={21} stroke={1.8} />
            </a>
            <Link
              href="/docs/sponsors"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Sponsor Pixel UI
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <a
            href="https://vercel-status.com/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            All systems normal.
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-[768px] overflow-hidden border-t border-border pt-8 text-center">
          <div className="font-pixel-square text-[clamp(4.25rem,19vw,13.5rem)] font-black uppercase leading-none tracking-[-0.08em] text-foreground">
            pixel ui
          </div>
        </div>
      </div>
    </footer>
  )
}

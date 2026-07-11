import Link from 'next/link'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Components', href: '/primitives' },
      { label: 'Templates', href: '/templates' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Getting Started', href: '/docs/installation' },
      { label: 'Examples', href: '/examples' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/amansagar070707-crypto/pixel-ui', external: true },
      { label: 'Discord', href: '#', external: true },
      { label: 'Twitter / X', href: '#', external: true },
      { label: 'Contributing', href: '/docs/contributing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'License', href: '/license' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
]

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      {/* Main link columns */}
      <div className="mx-auto max-w-7xl grid grid-cols-2 gap-x-8 gap-y-10 px-5 py-16 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {col.heading}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-xs text-muted-foreground/50 sm:flex-row">
          <span className="font-mono font-semibold text-foreground/70">pixel-ui</span>
          <span className="font-mono">
            Open source agent UI primitives — v0.1.0
          </span>
          <a
            href="https://github.com/amansagar070707-crypto/pixel-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-muted-foreground"
            aria-label="pixel-ui on GitHub"
          >
            <GithubIcon size={13} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

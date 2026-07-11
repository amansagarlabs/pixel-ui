'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Command, Menu, Search, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Components', href: '#components' },
  { label: 'Blocks', href: '#blocks' },
  { label: 'CLI', href: '#cli' },
  { label: 'Docs', href: '#docs' },
]

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  )
}

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-background/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-14 max-w-screen-lg items-center justify-between border-x border-edge px-4 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo mark */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="pixel-ui home">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-foreground font-mono text-[11px] font-bold text-background">
            KB
          </span>
          <span className="hidden font-mono text-sm font-semibold tracking-tight sm:inline">
            pixel-ui
          </span>
        </Link>

        {/* Center links */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search components"
            className="hidden items-center gap-2 rounded-md border border-edge px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Search size={13} aria-hidden="true" />
            <span className="flex items-center gap-0.5 font-mono text-[10px]">
              <Command size={10} aria-hidden="true" />K
            </span>
          </button>
          <a
            href="https://github.com/amansagar070707-crypto/pixel-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-edge px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub repository, 2.1 thousand stars"
          >
            <GitHubIcon />
            <span className="font-mono text-[11px]">2.1k</span>
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-md border border-edge p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto max-w-screen-lg border-x border-t border-edge bg-background px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

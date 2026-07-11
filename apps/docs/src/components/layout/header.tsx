'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    return null
  }

  return (
    <header className={isHome ? 'absolute inset-x-0 top-3 z-50' : 'sticky top-0 z-50 border-b border-white/6 bg-black/70 backdrop-blur-xl'}>
      <div
        className={
          isHome
            ? 'mx-auto flex h-11 w-fit items-center gap-2 rounded-2xl border border-white/10 bg-[#111111]/90 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'mx-auto flex h-14 max-w-7xl items-center justify-between px-6'
        }
      >
        <Link href="/" className="font-pixel-square text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          pixel-ui
        </Link>
        <nav className={`flex items-center ${isHome ? 'gap-0.5' : 'gap-1'}`}>
          <Link
            href="/docs"
            className={`rounded-md px-3 py-1.5 font-pixel-square text-sm transition-colors ${
              pathname.startsWith('/docs')
                ? 'bg-white/5 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isHome ? 'Pricing' : 'Docs'}
          </Link>
          <Link
            href="/primitives"
            className={`rounded-md px-3 py-1.5 font-pixel-square text-sm transition-colors ${
              pathname.startsWith('/primitives')
                ? 'bg-white/5 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Components
          </Link>
          {isHome ? (
            <div className="ml-1 flex items-center gap-1 rounded-full border border-white/8 bg-black/60 px-2 py-1 text-zinc-500">
              <span className="text-[10px]">C</span>
              <span className="text-[10px]">K</span>
            </div>
          ) : (
            <>
              <Link
                href="/playground"
                className={`rounded-md px-3 py-1.5 font-pixel-square text-sm transition-colors ${
                  pathname.startsWith('/playground')
                    ? 'bg-white/5 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Playground
              </Link>
              <div className="mx-2 h-4 w-px bg-white/10" />
              <a
                href="https://github.com/amansagar070707-crypto/pixel-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 font-pixel-square text-sm text-zinc-400 transition-colors hover:text-white"
              >
                GitHub
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

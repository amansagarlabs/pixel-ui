'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import { BrandBadge } from '@/components/brand-mark'
import { GITHUB_REPO_URL } from '@/components/github-stats'
import { captureEvent } from '@/lib/analytics'
import { ThemeSwitcher } from '@/components/theme-switcher'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { componentRegistry } from '@/lib/component-registry'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Components', href: '/components' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/docs/blog' },
  { label: 'Sponsors', href: '/docs/sponsors' },
]

const docsLinks = [
  { label: 'Introduction', href: '/docs' },
  { label: 'Installation', href: '/docs/installation' },
  { label: 'Registry', href: '/docs/registry' },
  { label: 'Configuration', href: '/docs/configuration' },
  { label: 'CLI Reference', href: '/docs/cli' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!searchOpen) return

    const value = searchQuery.trim()
    if (!value) return

    const timer = window.setTimeout(() => {
      captureEvent('search_used', { query: value })
    }, 400)

    return () => window.clearTimeout(timer)
  }, [searchOpen, searchQuery])

  const goTo = (href: string) => {
    setSearchOpen(false)
    setSearchQuery('')
    router.push(href)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[70] h-14 border-b border-border/80 bg-background backdrop-blur-xl">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden min-[1440px]:block">
        <div className="absolute left-[calc(50%-var(--docs-center-width)/2)] top-0 h-full w-px bg-border/80" />
        <div className="absolute right-[calc(50%-var(--docs-center-width)/2)] top-0 h-full w-px bg-border/80" />
      </div>
      <div className="mx-auto flex h-full w-full max-w-[var(--docs-center-width)] items-center justify-between bg-background px-4">
          <Link href="/" className="flex min-h-10 items-center gap-2" aria-label="Pixel UI home">
            <BrandBadge className="h-8 w-8 shadow-none" markClassName="size-5 text-background" />
            <span className="hidden font-pixel-square text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground sm:inline">
              PIXEL UI
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <TooltipProvider delayDuration={180} skipDelayDuration={120}>
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={() => setSearchOpen(true)}
                    className="flex h-8 items-center gap-1.5 border-l border-border pl-3 text-muted-foreground transition-colors hover:text-foreground active:scale-[0.98]"
                  >
                    <Search size={16} />
                    <span className="rounded border border-border bg-secondary px-1.5 py-0.5 font-pixel-square text-[11px] leading-none text-muted-foreground">Ctrl</span>
                    <span className="rounded border border-border bg-secondary px-1.5 py-0.5 font-pixel-square text-[11px] leading-none text-muted-foreground">K</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>Search</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={GITHUB_REPO_URL}
                    aria-label="GitHub stars"
                    className="flex h-8 items-center gap-1.5 border-l border-border pl-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <IconBrandGithub size={16} />
                    {/* <span>{GITHUB_STARS}</span> */}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>Source code</TooltipContent>
              </Tooltip>
              <div className="border-l border-border pl-3">
                <ThemeSwitcher />
              </div>
            </div>
          </TooltipProvider>
          <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
            <CommandInput
              placeholder="Search components..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No component found.</CommandEmpty>
              <CommandGroup heading="Docs">
                {docsLinks.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.label} docs`}
                    onSelect={() => goTo(item.href)}
                  >
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">Docs</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Components">
                {componentRegistry.map((item) => (
                  <CommandItem
                    key={item.slug}
                    value={`${item.name} ${item.category} ${item.slug}`}
                    onSelect={() => goTo(item.href)}
                  >
                    <span>{item.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.category}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
      </div>
    </header>
  )
}

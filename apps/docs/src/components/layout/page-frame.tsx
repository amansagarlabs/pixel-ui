import type { CSSProperties, ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { cn } from '@/lib/utils'

export const PAGE_SHELL_WIDTH = 768
export const DOCS_CENTER_WIDTH = PAGE_SHELL_WIDTH
export const PAGE_SECTION_LABEL_CLASS =
  'text-[13px] font-medium leading-5 tracking-[0.01em] text-muted-foreground'
export const PAGE_TITLE_CLASS =
  'text-balance text-[clamp(3rem,4.6vw,4.25rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground'
export const PAGE_SUBHEAD_CLASS =
  'max-w-[58ch] text-pretty text-[17px] leading-8 text-muted-foreground'
export const PAGE_COMMAND_BLOCK_CLASS = 'mx-auto w-full max-w-[620px]'

export function PageShell({
  children,
  className,
  centerWidth = PAGE_SHELL_WIDTH,
}: {
  children: ReactNode
  className?: string
  centerWidth?: number
}) {
  return (
    <div
      className="relative min-h-screen bg-background"
      style={
        {
          '--docs-center-width': `${centerWidth}px`,
          '--docs-header-height': '56px',
        } as CSSProperties
      }
    >
      <SiteHeader />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[var(--docs-header-height)] bottom-0 z-0 hidden min-[1440px]:block">
        <div className="absolute left-[calc(50%-var(--docs-center-width)/2)] top-0 h-full w-px bg-border/80" />
        <div className="absolute right-[calc(50%-var(--docs-center-width)/2)] top-0 h-full w-px bg-border/80" />
      </div>
      <div className={cn('relative z-10 pt-[var(--docs-header-height)]', className)}>
        {children}
        <SiteFooter />
      </div>
    </div>
  )
}

export function SectionFrame({
  children,
  className,
  fullWidth = false,
}: {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}) {
  return (
    <div
      className={cn(
        fullWidth ? 'w-full px-4' : 'mx-auto w-full max-w-[var(--docs-center-width)] px-4',
        className
      )}
    >
      {children}
    </div>
  )
}

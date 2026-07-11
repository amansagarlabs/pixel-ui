'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PageShell } from '@/components/layout/page-frame'
import { TableOfContents } from '@/components/table-of-contents'
import { LineNav } from '@/components/line-nav'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  MacOSSidebar,
  defaultMacSidebarSections,
  docsMacSidebarSections,
  docsNavSections,
} from '@/components/ui/macos-sidebar'
import { IconLayoutSidebarFilled } from '@tabler/icons-react'

const defaultTOC = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'examples', title: 'Examples' },
]

const blogTOC = [
  { id: 'blog', title: 'Blog' },
  { id: 'posts', title: 'Posts' },
]

const sponsorsTOC = [
  { id: 'support', title: 'Support' },
  { id: 'contact', title: 'Contact' },
]

export function DocsLayout({ 
  children, 
  toc = defaultTOC 
}: { 
  children: React.ReactNode
  toc?: { id: string; title: string }[]
}) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const isPrimitiveDetail = pathname.startsWith('/primitives/') && pathname !== '/primitives'
  const isDocsPage =
    pathname.startsWith('/docs') || pathname === '/roadmap' || pathname === '/changelog'
  const sidebarSections = isDocsPage ? docsMacSidebarSections : defaultMacSidebarSections
  const navSections = isDocsPage ? docsNavSections : undefined
  const sidebarItems = sidebarSections.flatMap(section => section.items)
  const mobileNavSections = isDocsPage ? docsNavSections : undefined
  const resolvedToc =
    pathname === '/docs/blog'
      ? blogTOC
      : pathname === '/docs/sponsors'
        ? sponsorsTOC
        : toc

  return (
    <PageShell>
      <aside className="fixed left-0 top-[var(--docs-header-height)] z-20 hidden h-[calc(100svh-var(--docs-header-height))] w-[240px] overflow-hidden bg-transparent min-[1440px]:block">
        <MacOSSidebar
          pathname={pathname}
          sections={sidebarSections}
          navSections={navSections}
          className="h-full !block w-full"
        />
      </aside>

      {!isPrimitiveDetail ? (
        <aside className="fixed right-0 top-[var(--docs-header-height)] z-20 hidden h-[calc(100svh-var(--docs-header-height))] w-max overflow-visible bg-transparent min-[1440px]:block">
          <TableOfContents items={resolvedToc} />
        </aside>
      ) : null}

      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-[72px] z-40 flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground transition-colors hover:bg-card min-[1440px]:hidden"
      >
        <IconLayoutSidebarFilled size={18} />
      </button>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[320px] p-0 sm:max-w-[320px]">
          <div className="h-full overflow-y-auto bg-background px-2 py-4">
            {mobileNavSections ? (
              <LineNav
                activeHref={pathname}
                sections={mobileNavSections}
                scrollActiveIntoView={false}
                className="w-full py-4"
              />
            ) : (
              <LineNav
                activeHref={pathname}
                items={sidebarItems}
                scrollActiveIntoView={false}
                className="w-full py-6"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <main className="min-h-[calc(100svh-56px)] overflow-x-hidden pb-8">
        {children}
      </main>
      <div
        aria-hidden="true"
        className="full-bleed-stripes h-8 border-y border-border/60 opacity-70"
      />
    </PageShell>
  )
}

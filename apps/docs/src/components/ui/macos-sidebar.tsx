'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconLayoutSidebar, IconLayoutSidebarFilled } from '@tabler/icons-react'
import { LineNav, type LineNavSection } from '@/components/line-nav'
import { aiElementComponents } from '@/lib/component-registry'
import { cn } from '@/lib/utils'

export interface MacSidebarSection {
  title: string
  items: {
    title: string
    href: string
    isNew?: boolean
  }[]
}

interface MacOSSidebarProps {
  sections?: MacSidebarSection[]
  navSections?: LineNavSection[]
  pathname: string
  className?: string
}

const sidebarMotion = {
  type: 'spring' as const,
  stiffness: 170,
  damping: 28,
  mass: 0.9,
}

export function MacOSSidebar({
  sections,
  navSections,
  pathname,
  className,
}: MacOSSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.div
      layout
      animate={{ width: 240 }}
      transition={sidebarMotion}
      className={cn('relative hidden h-full min-h-0 shrink-0 overflow-hidden lg:block', className)}
    >
      <button
        type="button"
        onClick={() => setCollapsed(current => !current)}
        className={cn(
          'absolute left-3 top-[60px] z-20 flex size-7 items-center justify-center rounded-md border border-border/80 bg-background text-foreground transition-colors hover:bg-card',
          collapsed ? 'left-1' : 'left-3'
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <IconLayoutSidebar stroke={1.75} size={18} /> : <IconLayoutSidebarFilled size={18} />}
      </button>
      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.aside
            key="sidebar-panel"
            initial={{ opacity: 0, x: -12, scale: 0.985, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -10, scale: 0.985, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-14 flex h-fit max-h-[calc(100svh-var(--docs-header-height)-3.5rem)] min-h-0 flex-col rounded-2xl border border-border/70 bg-card/95 backdrop-blur-sm"
          >
            <div className="relative min-h-0 overflow-y-auto overflow-x-hidden px-1 pb-4 pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [mask-image:linear-gradient(to_bottom,transparent,black_28px,black_calc(100%-28px),transparent)] [&::-webkit-scrollbar]:hidden">
              {navSections && navSections.length > 0 ? (
                <LineNav
                  activeHref={pathname}
                  sections={navSections}
                  scrollActiveIntoView
                  className="w-full gap-0 py-0"
                />
              ) : (
                <div className="space-y-0">
                  {(sections ?? []).map((section) => (
                    <div key={section.title}>
                      <LineNav
                        activeHref={pathname}
                        items={section.items}
                        scrollActiveIntoView
                        className="w-full gap-0 py-0"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-px top-px z-10 h-8 rounded-t-2xl bg-gradient-to-b from-card to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-px bottom-px z-10 h-8 rounded-b-2xl bg-gradient-to-t from-card to-transparent" />
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export const defaultMacSidebarSections: MacSidebarSection[] = [
  {
    title: 'AI Labs',
    items: aiElementComponents.map((item) => ({
      title: item.name,
      href: item.href,
      isNew: item.isNew,
    })),
  },
]

export const docsNavSections: LineNavSection[] = [
  {
    title: 'Getting Started',
    defaultOpen: true,
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Registry', href: '/docs/registry' },
      { title: 'Project Structure', href: '/docs/project-structure' },
      { title: 'Configuration', href: '/docs/configuration' },
    ],
  },
  {
    title: 'Core Concepts',
    defaultOpen: false,
    items: [
      { title: 'Primitives', href: '/docs/primitives' },
      { title: 'Components', href: '/docs/components-guide' },
      { title: 'Schema & Validation', href: '/docs/schema' },
      { title: 'Adapters', href: '/docs/adapters' },
    ],
  },
  {
    title: 'Guides',
    defaultOpen: false,
    items: [
      { title: 'Building Agents', href: '/docs/guides/building-agents' },
      { title: 'Using Memory', href: '/docs/guides/using-memory' },
      { title: 'Custom Primitives', href: '/docs/guides/custom-primitives' },
      { title: 'Testing', href: '/docs/guides/testing' },
      { title: 'Deployment', href: '/docs/guides/deployment' },
    ],
  },
  {
    title: 'API Reference',
    defaultOpen: false,
    items: [
      { title: 'CLI Commands', href: '/docs/cli' },
      { title: 'SDK API', href: '/docs/sdk-api' },
      { title: 'Registry API', href: '/docs/registry-api' },
      { title: 'Configuration API', href: '/docs/configuration-api' },
    ],
  },
  {
    title: 'Components',
    defaultOpen: false,
    items: [
      { title: 'All Components', href: '/components' },
      { title: 'Reasoning', href: '/components?category=reasoning' },
      { title: 'Memory', href: '/components?category=memory' },
      { title: 'Tools', href: '/components?category=tools' },
      { title: 'I/O', href: '/components?category=io' },
      { title: 'Guardrails', href: '/components?category=guardrails' },
    ],
  },
  {
    title: 'Resources',
    defaultOpen: false,
    items: [
      { title: 'Blog', href: '/docs/blog' },
      { title: 'Sponsors', href: '/docs/sponsors' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Roadmap', href: '/roadmap' },
      { title: 'Playground', href: '/playground' },
      { title: 'Contributing', href: '/docs/contributing' },
    ],
  },
]

export const docsMacSidebarSections: MacSidebarSection[] = [
  {
    title: 'Docs',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Registry', href: '/docs/registry' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Roadmap', href: '/roadmap' },
      { title: 'CLI Reference', href: '/docs/cli' },
      { title: 'Configuration', href: '/docs/configuration' },
      { title: 'Blog', href: '/docs/blog' },
      { title: 'Sponsors', href: '/docs/sponsors' },
      { title: 'Playground', href: '/playground' },
    ],
  },
]

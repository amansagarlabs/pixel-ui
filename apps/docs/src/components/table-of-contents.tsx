'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { TOCMinimap, type TOCItemType } from '@/components/toc-minimap'
import { Skeleton } from '@/components/ui/skeleton'

interface TOCItem {
  id: string
  title: string
  depth?: number
}

export function TableOfContents({ items, expanded = false }: { items: TOCItem[]; expanded?: boolean }) {
  const pathname = usePathname()
  const [resolvedItems, setResolvedItems] = useState<TOCItemType[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const provided = items
        .filter(item => document.getElementById(item.id))
        .map((item) => ({
          title: item.title,
          url: `#${item.id}`,
          depth: item.depth ?? 2,
        }))

      if (provided.length) {
        setResolvedItems(provided)
        setIsLoaded(true)
        return
      }

      const usedIds = new Set<string>()
      const discovered = Array.from(document.querySelectorAll('main h1, main h2, main h3'))
        .map((heading) => {
          const element = heading as HTMLHeadingElement
          const text = element.textContent?.trim()

          if (!text) {
            return null
          }

          const baseId = element.id || slugify(text)
          const id = getUniqueId(baseId, usedIds)

          if (element.id !== id) {
            element.id = id
          }

          return {
            title: text,
            url: `#${id}`,
            depth: Number(element.tagName.replace('H', '')) + 1,
          }
        })
        .filter(Boolean) as TOCItemType[]

      setResolvedItems(discovered)
      setIsLoaded(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [items, pathname])

  const minimapItems = useMemo(() => resolvedItems.slice(0, 12), [resolvedItems])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 64
          window.scrollTo({ top: y, behavior: "smooth" })
        }, 100)
      }
    }
  }, [resolvedItems])

  if (!isLoaded) {
    return (
      <div className="flex h-full items-start justify-end p-5 pt-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    )
  }

  if (!minimapItems.length) {
    return null
  }

  return (
    <div className="flex h-full items-start justify-end p-5 pt-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <TOCMinimap items={minimapItems} defaultExpanded={expanded} />
      </div>
    </div>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getUniqueId(baseId: string, usedIds: Set<string>) {
  const seed = baseId || 'section'
  let id = seed
  let index = 2

  while (usedIds.has(id)) {
    id = `${seed}-${index}`
    index += 1
  }

  usedIds.add(id)
  return id
}

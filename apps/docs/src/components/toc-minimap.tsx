"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export type TOCItemType = {
  title: React.ReactNode
  url: string
  depth: number
}

export type TOCMinimapProps = {
  /** @fumadocsHref #tocitemtype */
  items: TOCItemType[]
  className?: string
  defaultExpanded?: boolean
}

export function TOCMinimap({ items, className, defaultExpanded = false }: TOCMinimapProps) {
  const itemIds = useMemo(
    () => items.map((item) => item.url.replace("#", "")),
    [items]
  )

  const activeHeading = useActiveHeading(itemIds)

  if (!items.length) {
    return null
  }

  if (defaultExpanded) {
    return (
      <div className={cn("w-max", className)}>
        <div className="w-max min-w-[13rem] max-w-[18rem] rounded-2xl border border-border bg-background/95 p-4 shadow-none dark:bg-card/95">
          <div className="flex max-h-[50dvh] min-w-max flex-col gap-2 overflow-y-auto overflow-x-hidden text-sm">
            {items.map((item) => {
              const isActive = item.url === `#${activeHeading}`
              const indentClass = item.depth > 2 ? "pl-4" : ""

              return (
                <a
                  key={item.url}
                  href={item.url}
                  data-depth={item.depth}
                  data-active={isActive}
                  className={cn(
                    "whitespace-nowrap rounded-md px-2 py-1 leading-6 transition-[color,background-color] duration-200",
                    indentClass,
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )}
                  onClick={handleItemClick}
                >
                  {item.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div className={cn("w-max", className)}>
          <div className="flex max-h-[50dvh] flex-col gap-3 overflow-hidden py-3 pl-6 pr-2 opacity-100 transition-opacity duration-200 data-popup-open:opacity-0">
            {items.map((item) => (
              <div
                key={item.url}
                data-depth={item.depth}
                data-active={item.url === `#${activeHeading}`}
                className={cn(
                  "h-0.5 w-6 shrink-0 rounded-sm bg-foreground/20 transition-[background-color] duration-200",
                  "data-[depth=3]:ml-2 data-[depth=3]:w-4",
                  "data-[depth=4]:ml-4 data-[depth=4]:w-2",
                  "data-active:bg-foreground"
                )}
              />
            ))}
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="left"
        sideOffset={-60}
        align="start"
        alignOffset={0}
        className="w-max min-w-max rounded-2xl border border-border bg-background/95 p-4 shadow-none dark:bg-card/95"
      >
        <div className="flex max-h-[50dvh] min-w-max flex-col gap-2 overflow-visible text-sm">
          {items.map((item) => {
            const isActive = item.url === `#${activeHeading}`
            const indentClass = item.depth > 2 ? "pl-4" : ""

            return (
              <a
                key={item.url}
                href={item.url}
                data-depth={item.depth}
                data-active={isActive}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-1 leading-6 transition-[color,background-color] duration-200",
                  indentClass,
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={handleItemClick}
              >
                {item.title}
              </a>
            )
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%", threshold: 0.98 }
    )

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      }
    }
  }, [itemIds])

  return activeId
}

function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const url = e.currentTarget.getAttribute("href") ?? ""
  scrollToHeading(url)
}

const HEADER_HEIGHT = 64

function scrollToHeading(url: string) {
  const id = url.replace("#", "")
  const element = document.getElementById(id)
  if (!element) return

  history.pushState(null, "", url)

  const y = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT
  window.scrollTo({ top: y, behavior: "smooth" })
}

/**
 * This component is inspired by Devouring Details and Skiper UI.
 */

"use client"

import { forwardRef, memo, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { IconChevronDown } from "@tabler/icons-react"
import type { CSSProperties, MouseEvent } from "react"

import { cn } from "@/lib/utils"

const lineVariants = {
  normal: { width: 24 },
  active: { width: 40 },
  hover: { width: 40 },
}

export type LineNavItem = {
  title: string
  href: string
}

export type LineNavSection = {
  title: string
  items: LineNavItem[]
  defaultOpen?: boolean
}

export type LineNavProps = {
  className?: string
  /** @fumadocsHref #linenavitem */
  items?: LineNavItem[]
  /** Grouped sections with headers. */
  sections?: LineNavSection[]
  /** Href of the active item. */
  activeHref?: string
  /** Scroll the active item into view on mount. */
  scrollActiveIntoView?: boolean
  /** Called when an item is clicked. */
  onItemClick?: (
    item: LineNavItem,
    event: MouseEvent<HTMLAnchorElement>
  ) => void
}

export function LineNav({
  className,
  items,
  sections,
  activeHref,
  scrollActiveIntoView = true,
  onItemClick,
}: LineNavProps) {
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (scrollActiveIntoView) {
      activeItemRef.current?.scrollIntoView({ block: "center" })
    }
  }, [scrollActiveIntoView])

  if (sections && sections.length > 0) {
    return (
      <nav
        className={cn("flex flex-col gap-1 py-4", className)}
        style={
          {
            "--line-nav-width": `${lineVariants.normal.width}px`,
          } as CSSProperties
        }
      >
        {sections.map((section) => (
          <LineNavGroup
            key={section.title}
            section={section}
            activeHref={activeHref}
            scrollActiveIntoView={scrollActiveIntoView}
            onItemClick={onItemClick}
          />
        ))}
      </nav>
    )
  }

  return (
    <nav
      className={cn("flex flex-col gap-2 py-5.25", className)}
      style={
        {
          "--line-nav-width": `${lineVariants.normal.width}px`,
        } as CSSProperties
      }
    >
      {(items ?? []).map((item, index) => {
        const isActive = item.href === activeHref

        return (
          <LineNavItem
            key={item.href}
            ref={isActive ? activeItemRef : undefined}
            title={item.title}
            href={item.href}
            active={isActive}
            isLast={index === (items ?? []).length - 1}
            onClick={
              onItemClick ? (event) => onItemClick(item, event) : undefined
            }
          />
        )
      })}
    </nav>
  )
}

function LineNavGroup({
  section,
  activeHref,
  scrollActiveIntoView,
  onItemClick,
}: {
  section: LineNavSection
  activeHref?: string
  scrollActiveIntoView?: boolean
  onItemClick?: (
    item: LineNavItem,
    event: MouseEvent<HTMLAnchorElement>
  ) => void
}) {
  const hasActiveChild = section.items.some((item) => item.href === activeHref)
  const [open, setOpen] = useState(section.defaultOpen ?? hasActiveChild)

  useEffect(() => {
    if (hasActiveChild) setOpen(true)
  }, [hasActiveChild])

  return (
    <div className="px-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
          hasActiveChild
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {section.title}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground"
        >
          <IconChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 py-1 pl-2">
              {section.items.map((item, index) => {
                const isActive = item.href === activeHref
                return (
                  <LineNavItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    active={isActive}
                    isLast={index === section.items.length - 1}
                    compact
                    onClick={
                      onItemClick
                        ? (event) => onItemClick(item, event)
                        : undefined
                    }
                  />
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MotionLink = motion.create(Link)

type LineNavItemProps = {
  title: string
  href: string
  active?: boolean
  isLast?: boolean
  compact?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const LineNavItem = memo(
  forwardRef<HTMLAnchorElement, LineNavItemProps>(function LineNavItem(
    { title, href, active = false, isLast = false, compact = false, onClick },
    ref
  ) {
  if (compact) {
    return (
      <MotionLink
        ref={ref}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors",
          active
            ? "bg-secondary/60 text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        )}
        href={href}
        initial={false}
        onClick={onClick}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-foreground"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
        <span>{title}</span>
      </MotionLink>
    )
  }
    return (
      <>
        <MotionLink
          ref={ref}
          aria-current={active ? "page" : undefined}
          className="group relative flex h-px items-center gap-3 after:absolute after:top-1/2 after:left-0 after:size-full after:-translate-y-1/2 after:p-3.5"
          href={href}
          initial={false}
          animate={active ? "active" : "normal"}
          whileHover="hover"
          onClick={onClick}
        >
          <motion.span
            className="block h-px shrink-0 bg-foreground/20 transition-[background-color] ease-out group-hover:bg-foreground group-aria-[current=page]:bg-foreground"
            variants={lineVariants}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <span className="text-sm whitespace-nowrap text-muted-foreground transition-[color] ease-out group-hover:text-foreground group-aria-[current=page]:text-foreground">
            {title}
          </span>
        </MotionLink>

        {!isLast && (
          <>
            <span className="block h-px w-(--line-nav-width) bg-foreground/20" />
            <span className="block h-px w-(--line-nav-width) bg-foreground/20" />
          </>
        )}
      </>
    )
  })
)

LineNavItem.displayName = "LineNavItem"

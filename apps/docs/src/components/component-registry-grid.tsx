"use client"

import Link from "next/link"
import { useMemo, useRef, useState, type ElementType } from "react"
import { captureEvent } from "@/lib/analytics"
import {
  Brain,
  CheckCircle2,
  Copy,
  Files,
  Grid2X2,
  Link2,
  List,
  MessageSquare,
  Package,
  PanelTop,
  ScanSearch,
  Shuffle,
  Sparkles,
  SquareTerminal,
  SunMedium,
  Wrench,
} from "lucide-react"
import { IconBrandGithub } from "@tabler/icons-react"
import { CompactAiElementPreview } from "@/components/ai-elements-preview"
import {
  componentCategories,
  type ComponentCategory,
  type ComponentRegistryItem,
} from "@/lib/component-registry"
import { cn } from "@/lib/utils"

const iconByCategory: Record<ComponentCategory, ElementType> = {
  pixel: Package,
  Reasoning: Brain,
  Memory: Files,
  Tools: Wrench,
  "I/O surfaces": MessageSquare,
  Guardrails: CheckCircle2,
}

const iconBySlug: Record<string, ElementType> = {
  "code-block-command": SquareTerminal,
  "code-block": SquareTerminal,
  terminal: SquareTerminal,
  "file-tree": Files,
  "copy-button": Copy,
  "dot-grid-spotlight": Grid2X2,
  "github-contributions": IconBrandGithub,
  "github-stars": IconBrandGithub,
  "icon-swap": Shuffle,
  "line-nav": List,
  "logos-carousel": PanelTop,
  "share-menu": Link2,
  "theme-switcher": SunMedium,
  "theme-toggle-effect": SunMedium,
  "toc-minimap": ScanSearch,
}

function CategoryTabs({
  category,
  onCategoryChange,
}: {
  category: (typeof componentCategories)[number]
  onCategoryChange: (category: (typeof componentCategories)[number]) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-border">
      {componentCategories.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => {
            onCategoryChange(tab)
            captureEvent('category_filtered', { category: tab })
          }}
          className={cn(
            "relative -mb-px px-0 pb-2 text-sm transition-colors",
            category === tab
              ? "border-b border-foreground font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export type GalleryCardVariant = "gallery-card" | "compact-card"

export function ComponentGalleryCard({
  item,
  source,
  variant = "gallery-card",
}: {
  item: ComponentRegistryItem
  source: "homepage_bento" | "components_grid" | "new_components"
  variant?: GalleryCardVariant
}) {
  const isCompact = variant === "compact-card"
  const Icon = isCompact
    ? iconBySlug[item.slug] ?? iconByCategory[item.category] ?? Sparkles
    : iconByCategory[item.category] ?? Sparkles
  const isPromptInput = item.slug.includes("prompt")

  return (
    <Link
      href={item.href}
      onClick={() => captureEvent("component_grid_clicked", { component: item.slug, source })}
      className="group block transition-opacity duration-200 group-hover/gallery:opacity-55 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
    >
      <GlowCard
        className={cn(
          "rounded-2xl",
          isCompact
            ? "rounded-2xl"
            : "h-[360px]"
        )}
      >
        {isCompact ? (
          <div className="flex min-h-10 items-center gap-2.5 px-3 py-3 transition-colors group-hover:bg-secondary/30">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
              <Icon size={14} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-medium text-foreground">{item.name}</span>
                {item.isNew ? <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-foreground" /> : null}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">{item.category}</span>
            </span>
          </div>
        ) : (
          <div className="grid h-full grid-rows-[minmax(0,7fr)_minmax(0,3fr)]">
            <div
              className={cn(
                "flex min-h-0 items-center justify-center overflow-hidden border-b border-border/70 bg-code/35 p-5",
                isPromptInput && "px-4 py-5"
              )}
            >
              <div
                className={cn(
                  "w-full overflow-hidden",
                  isPromptInput ? "max-w-[390px] scale-100" : "max-w-[370px] scale-[0.94]"
                )}
              >
                <CompactAiElementPreview slug={item.slug} />
              </div>
            </div>
            <div className="flex min-h-0 flex-col px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground">{item.name}</h3>
                    {item.isNew ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-foreground" />
                        new
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                  <Icon size={14} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
            </div>
          </div>
        )}
      </GlowCard>
    </Link>
  )
}

export function AiElementGallery({ items, source = 'components_grid' }: { items: ComponentRegistryItem[]; source?: 'homepage_bento' | 'components_grid' | 'new_components' }) {
  const [category, setCategory] = useState<(typeof componentCategories)[number]>("All")

  const filtered = useMemo(
    () => items.filter((item) => category === "All" || item.category === category),
    [category, items]
  )

  return (
    <div className="space-y-4">
      <CategoryTabs category={category} onCategoryChange={setCategory} />
      <div className="group/gallery grid gap-3 md:grid-cols-2">
        {filtered.map((item) => (
          <ComponentGalleryCard key={item.slug} item={item} source={source} variant="gallery-card" />
        ))}
      </div>
    </div>
  )
}

export function ComponentRegistryGrid({ items, source = 'components_grid' }: { items: ComponentRegistryItem[]; source?: 'homepage_bento' | 'components_grid' | 'new_components' }) {
  const fillerCount = items.length % 3 === 0 ? 0 : 3 - (items.length % 3)

  return (
    <div className="relative overflow-hidden border border-border/70">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.slug} className="border-b border-r border-border/70">
            <ComponentGalleryCard item={item} source={source} variant="compact-card" />
          </div>
        ))}
        {Array.from({ length: fillerCount }).map((_, index) => (
          <div key={`filler-${index}`} className="min-h-[58px] border-b border-r border-border/70" />
        ))}
      </div>
    </div>
  )
}
function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`)
        el.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`)
      }}
      className={cn(
        "group/card relative overflow-hidden border border-border/80 bg-background transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(190px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), color-mix(in oklch, var(--foreground) 10%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in oklch, var(--foreground) 4%, transparent), transparent 42%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 16%, transparent), inset 0 1px 0 color-mix(in oklch, var(--foreground) 12%, transparent)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react"
import { CheckCircle2 } from "lucide-react"
import { AiElementGallery } from "@/components/component-registry-grid"
import { InstallCommandBlock } from "@/components/install-command-block"
import { SectionFrame } from "@/components/layout/page-frame"
import {
  aiElementComponents,
  componentRegistry,
  essentialAiNativeComponents,
} from "@/lib/component-registry"

const DISCOVER_MORE = [
  "Reasoning",
  "Memory",
  "Tools",
  "I/O surfaces",
  "Guardrails",
]

function StripeDivider() {
  return (
    <div
      aria-hidden="true"
      className="full-bleed-stripes h-8 border-y border-border/60 opacity-60"
    />
  )
}

export function Skyline() {
  return (
    <div
      aria-hidden="true"
      className="full-bleed-stripes h-16 border-y border-border/60 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))] opacity-70"
    />
  )
}

export function FooterCredits() {
  const rows = [
    ["Crafted by", "@pixel-ui"],
    ["Inspired by", "Tailwind CSS", "shadcn/ui", "Vercel", "Evil Charts", "Devouring Details", "Skiper UI", "Making Software"],
    ["Deployed on", "Vercel"],
    ["Analytics", "OpenPanel", "PostHog"],
    ["Source code", "GitHub"],
    ["License", "MIT License"],
  ]

  return (
    <section className="mx-auto max-w-[920px] px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-[280px] grid-cols-[88px_1fr] gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
        {rows.map(([label, ...values]) => (
          <div key={label} className="contents">
            <div className="text-right">{label}</div>
            <div className="space-y-2 text-left text-foreground">
              {values.map((value) => (
                <div key={value}>{value}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-muted-foreground">
        <button type="button" aria-label="X" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1">
          <IconBrandX size={16} stroke={1.8} />
        </button>
        <button type="button" aria-label="GitHub" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1">
          <IconBrandGithub size={16} stroke={1.8} />
        </button>
        <button type="button" aria-label="LinkedIn" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1">
          <IconBrandLinkedin size={16} stroke={1.8} />
        </button>
        {/* <span className="rounded-md border border-border/70 px-2 py-1 text-[11px]">DMCA</span> */}
      </div>
    </section>
  )
}

export default function ComponentsPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-12 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[680px] space-y-5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Pixel UI&apos;s
          </p>
          <h1
            suppressHydrationWarning
            className="mx-auto max-w-[14ch] text-[clamp(2.9rem,5.5vw,5.6rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-foreground"
          >
             components           
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            For AI-native interfaces
          </p>
          <p className="mx-auto max-w-[600px] text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Browse {componentRegistry.length} agent primitives &mdash; grouped by how teams install, search, and ship. Every component is source you copy and own, not a black-box dependency.
          </p>
        </div>

        <InstallCommandBlock command="bunx --bun pixel-ui@latest add conversation" className="mx-auto w-full max-w-[620px]" />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs text-muted-foreground">
          <span>{componentRegistry.length} Components</span>
          <span aria-hidden="true">&middot;</span>
          <span>6 Categories</span>
          <span aria-hidden="true">&middot;</span>
          <span>MIT Licensed</span>
        </div>
      </SectionFrame>

      <div className="mt-8">
        <StripeDivider />
      </div>

      <SectionFrame>
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Pixel UI</p>
              <p className="mt-1 text-sm text-muted-foreground">Real composable AI agent components for chat, reasoning, tools, memory, and guardrails.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
              <CheckCircle2 size={14} />
              {aiElementComponents.length} installed
            </span>
          </div>
          <div className="mt-4">
            <AiElementGallery items={aiElementComponents} source="components_grid" />
          </div>
        </div>
      </SectionFrame>

      <div className="mt-8">
        <StripeDivider />
      </div>

      <SectionFrame>
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Essential AI-native additions</p>
              <p className="mt-1 text-sm text-muted-foreground">Research-backed components to make pixel-ui feel like a serious AI product registry.</p>
            </div>
            <span className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
              next
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-border/70">
            <div className="grid gap-px sm:grid-cols-2">
              {essentialAiNativeComponents.map((item) => (
                <div key={item.name} className="bg-background p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="rounded-md border border-border px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                      planned
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="flex justify-center py-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background">
            <CheckCircle2 size={14} />
            Trusted Registry
          </span>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Discover more</span>
            {DISCOVER_MORE.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </SectionFrame>

      <div className="mt-8">
        <StripeDivider />
      </div>

      <FooterCredits />
    </article>
  )
}

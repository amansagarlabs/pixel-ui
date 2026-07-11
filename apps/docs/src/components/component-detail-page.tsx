"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Share,
} from "lucide-react"

import { CopyButton } from "@/components/copy-button"
import { InstallCommandBlock } from "@/components/install-command-block"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { captureEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

export type ManualStep = {
  title: string
  code?: string
  label?: string
  language?: string
  expandable?: boolean
}

export type ApiProp = {
  name: string
  type: string
  description?: string
}

export type Credit = {
  label: string
  href: string
}

export type ComponentDetailPageProps = {
  name: string
  description: string
  previewComponent: ReactNode
  codeSnippet: string
  installCommand: string
  manualSteps: ManualStep[]
  usageImport: string
  usageExample: string
  a11yNotes: string
  apiProps: ApiProp[]
  credits: Credit[]
  markdownContent?: string
}

function formatCodeBlock(code: string, label?: string) {
  const inferredLanguage =
    label?.split(".").pop()?.toLowerCase() === "tsx"
      ? "tsx"
      : label?.split(".").pop()?.toLowerCase() === "ts"
        ? "ts"
        : label?.toLowerCase() === "import"
          ? "ts"
          : label?.toLowerCase() === "example"
            ? "tsx"
            : ""

  return `${label ? `**${label}**\n\n` : ""}\`\`\`${inferredLanguage}\n${code}\n\`\`\``
}

function buildMarkdownContent({
  name,
  description,
  codeSnippet,
  installCommand,
  manualSteps,
  usageImport,
  usageExample,
  a11yNotes,
  apiProps,
  credits,
}: Omit<ComponentDetailPageProps, "previewComponent" | "markdownContent">) {
  const previewSection =
    codeSnippet.includes("export default function") && codeSnippet.includes("return (")
      ? codeSnippet
      : `export default function ${name.replace(/\s+/g, "")}Demo() {\n  return (\n    ${codeSnippet}\n  )\n}`

  const manualSection = manualSteps
    .map((step, index) => {
      if (!step.code) {
        return `${index + 1}. ${step.title}`
      }

      return `${index + 1}. ${step.title}\n\n${formatCodeBlock(step.code, step.label ?? step.language)}`
    })
    .join("\n\n")

  const apiTable = [
    "| Prop | Type | Description |",
    "| --- | --- | --- |",
    ...apiProps.map((prop) => `| ${prop.name} | ${prop.type} | ${prop.description ?? ""} |`),
  ].join("\n")

  const creditsList = credits.map((credit) => `- [${credit.label}](${credit.href})`).join("\n")

  return [
    "---",
    `title: ${name}`,
    `description: ${description}`,
    "---",
    "",
    `# ${name}`,
    "",
    description,
    "",
    "## Preview",
    "",
    formatCodeBlock(previewSection, "usage.tsx"),
    "",
    "## Installation",
    "",
    formatCodeBlock(installCommand, "Command"),
    "",
    "## Manual Install",
    "",
    manualSection,
    "",
    "## Usage",
    "",
    formatCodeBlock(usageImport, "Import"),
    "",
    formatCodeBlock(usageExample, "Example"),
    "",
    "## Accessibility",
    "",
    a11yNotes,
    "",
    "## API Reference",
    "",
    apiTable,
    "",
    "## Credits",
    "",
    creditsList,
  ].join("\n")
}

function IconTooltip({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

function Toolbar({ copyText }: { copyText: string }) {
  return (
    <TooltipProvider delayDuration={180} skipDelayDuration={120}>
      <div className="flex items-center justify-between gap-3 border-b border-border/70 py-2">
      <Link
        href="/components"
        className="inline-flex min-h-8 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
      >
        <ArrowLeft size={16} />
        Components
      </Link>
      <div className="flex items-center gap-1.5">
        <IconTooltip label="Copy page">
          <CopyButton
            text={copyText}
            variant="secondary"
            size="sm"
            className="h-8 rounded-md border border-border bg-card px-2.5 text-xs shadow-none active:scale-[0.98]"
          >
            <span>Copy page</span>
          </CopyButton>
        </IconTooltip>
        <IconTooltip label="Copy options">
          <Button variant="secondary" size="icon" className="size-8 border border-border bg-card shadow-none active:scale-[0.97]">
            <ChevronDown size={15} />
            <span className="sr-only">Copy options</span>
          </Button>
        </IconTooltip>
        <IconTooltip label="Share">
          <Button variant="secondary" size="icon" className="size-8 border border-border bg-card shadow-none active:scale-[0.97]">
            <Share size={15} />
            <span className="sr-only">Share</span>
          </Button>
        </IconTooltip>
        <IconTooltip label="Previous component">
          <Button variant="secondary" size="icon" className="size-8 border border-border bg-card shadow-none active:scale-[0.97]">
            <ArrowLeft size={15} />
            <span className="sr-only">Previous component</span>
          </Button>
        </IconTooltip>
        <IconTooltip label="Next component">
          <Button variant="secondary" size="icon" className="size-8 border border-border bg-card shadow-none active:scale-[0.97]">
            <ArrowRight size={15} />
            <span className="sr-only">Next component</span>
          </Button>
        </IconTooltip>
      </div>
      </div>
    </TooltipProvider>
  )
}

function trackInstallCommandCopy(data: { packageManager: "pnpm" | "yarn" | "npm" | "bun"; command: string }) {
  captureEvent('install_command_copied', {
    package_manager: data.packageManager,
  })
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative h-8 px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        active && "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-foreground"
      )}
    >
      {children}
    </button>
  )
}

function CodePanel({
  code,
  label,
  className,
  clipped,
}: {
  code: string
  label: string
  className?: string
  clipped?: boolean
}) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-border bg-code", className)}>
      <div className="flex h-10 items-center justify-between border-b border-border bg-card px-3">
        <span className="font-mono text-xs text-muted-foreground">{label}</span>
        <TooltipProvider delayDuration={180} skipDelayDuration={120}>
          <IconTooltip label="Copy code">
            <CopyButton text={code} variant="ghost" size="icon" className="size-7 shadow-none active:scale-[0.97]" />
          </IconTooltip>
        </TooltipProvider>
      </div>
      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-[13px] leading-6 text-code-foreground",
          clipped && "max-h-72 overflow-hidden"
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

function PreviewTabs({ preview, code }: { preview: ReactNode; code: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview")

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center border-b border-border">
        <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
          Preview
        </TabButton>
        <TabButton active={tab === "code"} onClick={() => setTab("code")}>
          Code
        </TabButton>
      </div>
      {tab === "preview" ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-b-md border-t-0 bg-background p-8">
          {preview}
        </div>
      ) : (
        <div className="p-1">
          <CodePanel code={code} label="usage.tsx" className="border-0 bg-background" />
        </div>
      )}
    </div>
  )
}

function InstallSection({
  installCommand,
  manualSteps,
}: {
  installCommand: string
  manualSteps: ManualStep[]
}) {
  const [tab, setTab] = useState<"command" | "manual">("manual")

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
      <div className="flex items-center">
        <TabButton active={tab === "command"} onClick={() => setTab("command")}>
          Command
        </TabButton>
        <TabButton active={tab === "manual"} onClick={() => setTab("manual")}>
          Manual
        </TabButton>
      </div>
      {tab === "command" ? (
        <InstallCommandBlock
          command={installCommand}
          className="!mx-0"
          onCopySuccess={trackInstallCommandCopy}
        />
      ) : (
        <div className="space-y-6">
          {manualSteps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[28px_1fr] gap-4">
              <div className="flex size-6 items-center justify-center rounded-full bg-secondary font-mono text-xs font-semibold text-foreground">
                {index + 1}
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">{step.title}</h3>
                {index === 0 ? (
                  <InstallCommandBlock
                    command={installCommand}
                    className="!mx-0"
                    onCopySuccess={trackInstallCommandCopy}
                  />
                ) : step.code ? (
                  <div className="relative">
                    <CodePanel
                      code={step.code}
                      label={step.label ?? step.language ?? "code"}
                      clipped={step.expandable}
                    />
                    {step.expandable ? (
                      <button
                        type="button"
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-3 py-1 font-mono text-xs"
                      >
                        Expand
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function ApiTable({ name, props }: { name: string; props: ApiProp[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">API reference</h2>
      <h3 className="text-base font-semibold">{name}</h3>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-[1fr_1fr_32px] border-b border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          <div>Prop</div>
          <div className="tabular-nums">Type</div>
          <div />
        </div>
        {props.map((prop) => (
          <details key={prop.name} className="group">
            <summary className="grid cursor-pointer list-none grid-cols-[1fr_1fr_32px] items-center px-4 py-3 font-mono text-sm">
              <span>{prop.name}</span>
              <span className="tabular-nums">{prop.type}</span>
              <ChevronRight size={15} className="justify-self-end text-muted-foreground transition-transform group-open:rotate-90" />
            </summary>
            {prop.description ? (
              <p className="border-t border-border px-4 pb-4 pt-1 text-sm text-muted-foreground">
                {prop.description}
              </p>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  )
}

export function ComponentDetailPage({
  name,
  description,
  previewComponent,
  codeSnippet,
  installCommand,
  manualSteps,
  usageImport,
  usageExample,
  a11yNotes,
  apiProps,
  credits,
  markdownContent,
}: ComponentDetailPageProps) {
  const copyPageContent =
    markdownContent ??
    buildMarkdownContent({
      name,
      description,
      codeSnippet,
      installCommand,
      manualSteps,
      usageImport,
      usageExample,
      a11yNotes,
      apiProps,
      credits,
    })

  return (
    <article className="mx-auto w-full max-w-[var(--docs-center-width)] px-4 pb-10 text-foreground">
      <Toolbar copyText={copyPageContent} />
      <div className="space-y-8 py-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">{name}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </header>

        <PreviewTabs preview={previewComponent} code={codeSnippet} />
        <InstallSection installCommand={installCommand} manualSteps={manualSteps} />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          <CodePanel code={usageImport} label="Import" />
          <CodePanel code={usageExample} label="Example" />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Accessibility</h2>
          <h3 className="text-base font-semibold">Reduced motion</h3>
          <p className="max-w-[68ch] text-sm leading-6 text-muted-foreground">
            {a11yNotes} Respect <code className="font-mono text-foreground">prefers-reduced-motion</code> so animated effects do not become required interaction.
          </p>
        </section>

        <ApiTable name={name.replace(/\s+/g, "")} props={apiProps} />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Credits</h2>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            {credits.map((credit) => (
              <li key={credit.label}>
                <a className="font-medium underline underline-offset-4" href={credit.href}>
                  {credit.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div
          aria-hidden="true"
          className="full-bleed-stripes h-8 border-y border-border/60 opacity-70"
        />
      </div>
    </article>
  )
}

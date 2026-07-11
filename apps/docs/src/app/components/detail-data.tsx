import type { ComponentDetailPageProps } from "@/components/component-detail-page"
import { AiElementPreview } from "@/components/ai-elements-preview"
import { EssentialPreview } from "@/components/essential-preview"
import { LogosCarousel } from "@/components/logos-carousel"
import { aiElementComponents, type ComponentRegistryItem } from "@/lib/component-registry"

const cnHelper = `import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}`

const logosCarouselSource = `"use client"

import { Children, memo, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_COLUMN_COUNT = 4
const CYCLE_INTERVAL = 1600
const STAGGER_DELAY = 125
const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const

type WaveDirection = "ltr" | "rtl"

export type LogosCarouselProps = {
  children: ReactNode
  columnCount?: number
  direction?: WaveDirection
  className?: string
}

export function LogosCarousel({
  children,
  columnCount = DEFAULT_COLUMN_COUNT,
  direction = "ltr",
  className,
}: LogosCarouselProps) {
  const columns = useMemo(
    () => distributeLogos(Children.toArray(children), columnCount),
    [children, columnCount]
  )

  const reduceMotion = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)
  const isPageInView = usePageInView()
  const isInView = useInView(containerRef, { margin: "100px" })
  const shouldPlay = !reduceMotion && isPageInView && isInView
  const [activeIndices, setActiveIndices] = useState<number[]>(() => columns.map(() => 0))

  useEffect(() => {
    if (!shouldPlay) return
    const beatId = setInterval(() => {
      setActiveIndices((prev) =>
        columns.map((column, columnIndex) => ((prev[columnIndex] ?? 0) + 1) % column.length)
      )
    }, CYCLE_INTERVAL)
    return () => clearInterval(beatId)
  }, [columns, shouldPlay])

  return (
    <div ref={containerRef} className={cn("grid", className)}>
      {columns.map((columnLogos, columnIndex) => (
        <LogoColumn
          key={columnIndex}
          logos={columnLogos}
          activeIndex={(activeIndices[columnIndex] ?? 0) % columnLogos.length}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}

const LogoColumn = memo(function LogoColumn({
  logos,
  activeIndex,
  reduceMotion,
}: {
  logos: ReactNode[]
  activeIndex: number
  reduceMotion: boolean
}) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div key={activeIndex}>{logos[activeIndex]}</motion.div>
    </AnimatePresence>
  )
})

function distributeLogos(logos: ReactNode[], columnCount: number): ReactNode[][] {
  const effectiveCount = Math.min(columnCount, logos.length)
  const columns: ReactNode[][] = Array.from({ length: effectiveCount }, () => [])
  logos.forEach((logo, index) => columns[index % effectiveCount].push(logo))
  return columns
}`

const usageImport = `import { LogosCarousel } from "@/components/logos-carousel"`

const usageExample = `<LogosCarousel>
  <Logo />
  <Logo />
  <Logo />
  <Logo />
</LogosCarousel>`

const logoNames = ["KaidonBlocks", "React Bits", "shadcnspace.", "shadcncraft"]

function LogosCarouselPreview() {
  return (
    <LogosCarousel className="w-full gap-6 text-foreground">
      {logoNames.map((logo) => (
        <div key={logo} className="flex h-12 items-center justify-center text-sm font-semibold sm:text-base">
          {logo}
        </div>
      ))}
    </LogosCarousel>
  )
}

const defaultApiProps = [
  { name: "children", type: "ReactNode", description: "Content rendered by the component." },
  { name: "columnCount?", type: "number", description: "Optional number of rendered columns." },
  { name: "direction?", type: "union", description: "Optional direction for directional effects." },
  { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
]

const aiElementSourceFiles: Record<string, string> = {
  source: "sources",
  branch: "message",
  actions: "message",
  loader: "shimmer",
  "message-content": "message",
  "message-avatar": "message",
}

const aiElementExports: Record<string, string> = {
  conversation: "Conversation, ConversationContent, ConversationScrollButton",
  message: "Message, MessageContent, MessageActions",
  "message-content": "MessageContent",
  "message-avatar": "Message",
  "prompt-input": "PromptInput, PromptInputBody, PromptInputTextarea, PromptInputSubmit",
  tool: "Tool, ToolHeader, ToolContent, ToolInput, ToolOutput",
  reasoning: "Reasoning, ReasoningTrigger, ReasoningContent",
  "chain-of-thought": "ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtStep",
  task: "Task, TaskTrigger, TaskContent, TaskItem",
  queue: "Queue, QueueSection, QueueItem",
  plan: "Plan, PlanHeader, PlanTitle, PlanContent",
  attachments: "Attachments, Attachment, AttachmentPreview, AttachmentInfo",
  source: "Sources, SourcesTrigger, SourcesContent, Source",
  branch: "MessageBranch, MessageBranchContent, MessageBranchSelector",
  artifact: "Artifact, ArtifactHeader, ArtifactTitle, ArtifactContent",
  actions: "MessageActions, MessageAction",
  suggestion: "Suggestions, Suggestion",
  loader: "Shimmer",
  "code-block": "CodeBlock, CodeBlockHeader, CodeBlockContent, CodeBlockCopyButton",
  terminal: "Terminal, TerminalHeader, TerminalContent, TerminalCopyButton",
  "file-tree": "FileTree, FileTreeFolder, FileTreeFile",
  checkpoint: "Checkpoint, CheckpointIcon, CheckpointTrigger",
}

const registryItemUrl = (slug: string) => `https://registry.pixel-ui.amansagar.in/r/${slug}.json`
const shadcnInstallCommand = (slug: string) => `npx shadcn@latest add ${registryItemUrl(slug)}`

const aiElementPropRows: Record<string, ComponentDetailPageProps["apiProps"]> = {
  conversation: [
    { name: "children", type: "ReactNode", description: "Messages and scroll controls rendered inside the surface." },
    { name: "initial?", type: "StickToBottom behavior", description: "Initial scroll behavior inherited from StickToBottom." },
    { name: "resize?", type: "StickToBottom behavior", description: "Resize scroll behavior inherited from StickToBottom." },
    { name: "className?", type: "string", description: "Additional classes for the conversation root." },
  ],
  tool: [
    { name: "type", type: "string", description: "Tool name displayed in the header." },
    { name: "state", type: "ToolUIPart state", description: "Current tool state used for the badge." },
    { name: "input?", type: "unknown", description: "Tool input JSON displayed in the input block." },
    { name: "output?", type: "ReactNode", description: "Tool output displayed after execution." },
  ],
  reasoning: [
    { name: "isStreaming?", type: "boolean", description: "Keeps the reasoning disclosure in active thinking state." },
    { name: "open?", type: "boolean", description: "Controlled open state." },
    { name: "defaultOpen?", type: "boolean", description: "Initial open state." },
    { name: "duration?", type: "number", description: "Displayed thinking duration in seconds." },
  ],
  "prompt-input": [
    { name: "onSubmit", type: "(message, event) => void", description: "Called with text and attachments on submit." },
    { name: "accept?", type: "string", description: "Accepted attachment MIME filter." },
    { name: "multiple?", type: "boolean", description: "Allow multiple attachments." },
    { name: "maxFiles?", type: "number", description: "Maximum attachment count." },
  ],
  attachments: [
    { name: "variant?", type: "grid | inline | list", description: "Attachment layout style." },
    { name: "data", type: "AttachmentData", description: "File metadata for each attachment item." },
    { name: "onRemove?", type: "() => void", description: "Optional remove action." },
    { name: "className?", type: "string", description: "Additional classes." },
  ],
}

function aiElementDetail(item: ComponentRegistryItem): ComponentDetailPageProps {
  const sourceName = aiElementSourceFiles[item.slug] ?? item.slug
  const exportName = aiElementExports[item.slug] ?? item.name.replace(/\s+/g, "")
  const componentName = item.name.replace(/\s+/g, "")
  const usageImport = `import { ${exportName} } from "@/components/ai-elements/${sourceName}"`
  const isTextFlip = item.slug === "text-flip"
  const textFlipInstallCommand = "npm install motion clsx tailwind-merge"
  const textFlipSource = `"use client"

import { Children, useEffect, useState } from "react"
import type { Transition, Variants } from "motion/react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

const defaultVariants: Variants = {
  initial: { y: "-20%", opacity: 0, filter: "blur(1px)" },
  animate: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: "40%",
    opacity: 0,
    filter: "blur(1px)",
    transition: { ease: "easeOut" },
  },
}

type MotionElement = typeof motion.p | typeof motion.span | typeof motion.code

export type TextFlipProps = {
  as?: MotionElement
  className?: string
  children: React.ReactNode[]
  interval?: number
  transition?: Transition
  variants?: Variants
  play?: boolean
  onIndexChange?: (index: number) => void
}

export function TextFlip({
  as: Component = motion.p,
  className,
  children,
  interval = 2,
  transition = { duration: 0.3 },
  variants = defaultVariants,
  play = true,
  onIndexChange,
}: TextFlipProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)

  useEffect(() => {
    if (!play) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, interval * 1000)

    return () => clearInterval(timer)
  }, [play, interval, items.length, onIndexChange])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component
        key={currentIndex}
        className={cn("inline-block", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        variants={variants}
      >
        {items[currentIndex]}
      </Component>
    </AnimatePresence>
  )
}`
  const textFlipUsageImport = `import { TextFlip } from "@/components/text-flip"`
  const textFlipUsageExample = `<TextFlip>
  <span>Developer</span>
  <span>Designer</span>
  <span>Creator</span>
</TextFlip>`
  const usageExample = item.slug === "tool"
    ? `<Tool defaultOpen>
  <ToolHeader type="tool-readFile" state="input-available" />
  <ToolContent>
    <ToolInput input={{ path: "registry/approval/index.ts" }} />
    <ToolOutput output="Parsed approval policy." />
  </ToolContent>
</Tool>`
    : `<${componentName} />`

  return {
    name: item.name,
    description: item.description,
    previewComponent: <AiElementPreview slug={item.slug} />,
    codeSnippet: isTextFlip
      ? textFlipSource
      : `${usageImport}

export default function ${componentName}Demo() {
  return (
    ${usageExample}
  )
}`,
    installCommand: isTextFlip ? textFlipInstallCommand : shadcnInstallCommand(item.slug),
    manualSteps: [
      isTextFlip
        ? {
            title: "Install the following dependencies",
            code: textFlipInstallCommand,
            label: "Command",
          }
        : { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: isTextFlip
          ? textFlipSource
          : `// Installed from AI Elements registry.
// See apps/docs/src/components/ai-elements/${sourceName}.tsx for the full source.`,
        label: isTextFlip ? "components/text-flip.tsx" : `components/ai-elements/${sourceName}.tsx`,
      },
      isTextFlip
        ? {
            title: "Use the component",
            code: textFlipUsageExample,
            label: "Usage",
          }
        : { title: "Update the import paths to match your project setup" },
    ],
    usageImport,
    usageExample,
    a11yNotes:
      "Respect reduced motion for streaming, loading, and disclosure transitions. Keep controls keyboard reachable and maintain readable labels for screen readers.",
    apiProps: aiElementPropRows[item.slug] ?? [
      { name: "children", type: "ReactNode", description: "Nested composition content." },
      { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
      { name: "asChild?", type: "boolean", description: "Available on trigger/action subcomponents where Radix composition is used." },
      { name: "...props", type: "HTML attributes", description: "Native element or shadcn primitive props are forwarded." },
    ],
    credits: [
      { label: "AI Elements", href: "https://elements.ai-sdk.dev/" },
      { label: "Vercel AI SDK", href: "https://ai-sdk.dev/" },
    ],
  }
}

const aiElementDetails = Object.fromEntries(
  aiElementComponents.map((item) => [item.slug, aiElementDetail(item)])
) as Record<string, ComponentDetailPageProps>

export const componentDetails: Record<string, ComponentDetailPageProps> = {
  ...aiElementDetails,
  "confirmation": {
    name: "Confirmation",
    description: "Approval and denial surfaces for high-impact tool calls.",
    previewComponent: <EssentialPreview slug="confirmation" />,
    codeSnippet: `import { Confirmation } from "@/components/confirmation"

export default function ConfirmationDemo() {
  return (
    <Confirmation
      title="Delete file?"
      description="This action cannot be undone."
      onApprove={() => console.log("Approved")}
      onDeny={() => console.log("Denied")}
    />
  )
}`,
    installCommand: shadcnInstallCommand("confirmation"),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: `export function Confirmation({
  title,
  description,
  onApprove,
  onDeny,
}: {
  title: string
  description?: string
  onApprove: () => void
  onDeny: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={onDeny} className="px-3 py-1.5 text-sm font-medium border rounded-md">Deny</button>
        <button onClick={onApprove} className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md">Approve</button>
      </div>
    </div>
  )
}`,
        label: "components/confirmation.tsx",
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport: `import { Confirmation } from "@/components/confirmation"`,
    usageExample: `<Confirmation
  title="Delete file?"
  description="This action cannot be undone."
  onApprove={() => console.log("Approved")}
  onDeny={() => console.log("Denied")}
/>`,
    a11yNotes: "Use clear labels for approve/deny actions. Maintain keyboard focus management and provide ARIA live regions for status updates.",
    apiProps: [
      { name: "title", type: "string", description: "The confirmation message to display." },
      { name: "description?", type: "string", description: "Optional additional context." },
      { name: "onApprove", type: "() => void", description: "Called when the user confirms." },
      { name: "onDeny", type: "() => void", description: "Called when the user denies." },
      { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
    ],
    credits: [{ label: "KaidonBlocks", href: "https://github.com/amansagar070707-crypto/KaidonBlocks" }],
  },
  "model-selector": {
    name: "Model Selector",
    description: "Provider and model switcher for multi-model agent products.",
    previewComponent: <EssentialPreview slug="model-selector" />,
    codeSnippet: `import { ModelSelector } from "@/components/model-selector"

export default function ModelSelectorDemo() {
  return (
    <ModelSelector
      models={[
        { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
        { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
      ]}
      value="gpt-4o"
      onChange={(model) => console.log(model)}
    />
  )
}`,
    installCommand: shadcnInstallCommand("model-selector"),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: `export function ModelSelector({
  models,
  value,
  onChange,
  className,
}: {
  models: Array<{ id: string; name: string; provider: string }>
  value: string
  onChange: (modelId: string) => void
  className?: string
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground">Model</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name} - {model.provider}
          </option>
        ))}
      </select>
    </div>
  )
}`,
        label: "components/model-selector.tsx",
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport: `import { ModelSelector } from "@/components/model-selector"`,
    usageExample: `<ModelSelector
  models={[
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
  ]}
  value="gpt-4o"
  onChange={(model) => console.log(model)}
/>`,
    a11yNotes: "Use semantic HTML for the select element. Ensure keyboard navigation works and provide clear labels for each model option.",
    apiProps: [
      { name: "models", type: "Array<{ id, name, provider }>", description: "List of available models." },
      { name: "value", type: "string", description: "Currently selected model ID." },
      { name: "onChange", type: "(modelId: string) => void", description: "Called when selection changes." },
      { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
    ],
    credits: [{ label: "KaidonBlocks", href: "https://github.com/amansagar070707-crypto/KaidonBlocks" }],
  },
  "sandbox": {
    name: "Sandbox",
    description: "Isolated execution preview for generated code and commands.",
    previewComponent: <EssentialPreview slug="sandbox" />,
    codeSnippet: `import { Sandbox } from "@/components/sandbox"

export default function SandboxDemo() {
  return (
    <Sandbox
      code="console.log('Hello, World!')"
      language="javascript"
      onRun={(code) => console.log(code)}
    />
  )
}`,
    installCommand: shadcnInstallCommand("sandbox"),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: `export function Sandbox({
  code,
  language = "javascript",
  onRun,
  className,
}: {
  code: string
  language?: string
  onRun?: (code: string) => void
  className?: string
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-border bg-[#1e1e1e]">
        <div className="flex items-center gap-1.5 border-b border-border bg-[#2d2d2d] px-3 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-gray-400">sandbox</span>
        </div>
        <pre className="p-3 font-mono text-sm text-green-400">{code}</pre>
        {onRun && (
          <div className="border-t border-border bg-[#2d2d2d] px-3 py-2">
            <button onClick={() => onRun(code)} className="px-3 py-1 text-xs font-medium border rounded-md">Run</button>
          </div>
        )}
      </div>
    </div>
  )
}`,
        label: "components/sandbox.tsx",
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport: `import { Sandbox } from "@/components/sandbox"`,
    usageExample: `<Sandbox
  code="console.log('Hello, World!')"
  language="javascript"
  onRun={(code) => console.log(code)}
/>`,
    a11yNotes: "Provide clear visual feedback for running states. Use ARIA live regions to announce output changes for screen readers.",
    apiProps: [
      { name: "code", type: "string", description: "The code to display in the sandbox." },
      { name: "language?", type: "string", description: "Programming language for syntax highlighting." },
      { name: "onRun?", type: "(code: string) => void", description: "Called when the user runs the code." },
      { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
    ],
    credits: [{ label: "KaidonBlocks", href: "https://github.com/amansagar070707-crypto/KaidonBlocks" }],
  },
  "web-preview": {
    name: "Web Preview",
    description: "Live browser preview for generated apps and artifacts.",
    previewComponent: <EssentialPreview slug="web-preview" />,
    codeSnippet: `import { WebPreview } from "@/components/web-preview"

export default function WebPreviewDemo() {
  return (
    <WebPreview
      url="https://example.com"
      onRefresh={() => console.log("Refresh")}
    />
  )
}`,
    installCommand: shadcnInstallCommand("web-preview"),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: `export function WebPreview({
  url,
  onRefresh,
  className,
}: {
  url: string
  onRefresh?: () => void
  className?: string
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 rounded-md border border-border bg-background px-2 py-1">
            <span className="font-mono text-xs">{url}</span>
          </div>
          {onRefresh && (
            <button onClick={onRefresh} className="text-muted-foreground hover:text-foreground">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex h-48 items-center justify-center bg-background p-4">
          <p className="text-xs text-muted-foreground">Preview: {url}</p>
        </div>
      </div>
    </div>
  )
}`,
        label: "components/web-preview.tsx",
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport: `import { WebPreview } from "@/components/web-preview"`,
    usageExample: `<WebPreview
  url="https://example.com"
  onRefresh={() => console.log("Refresh")}
/>`,
    a11yNotes: "Use an iframe with appropriate title attribute. Provide alternative text for the preview content and ensure the refresh action is keyboard accessible.",
    apiProps: [
      { name: "url", type: "string", description: "The URL to preview." },
      { name: "onRefresh?", type: "() => void", description: "Called when the user clicks refresh." },
      { name: "className?", type: "string", description: "Additional classes merged onto the root element." },
    ],
    credits: [{ label: "KaidonBlocks", href: "https://github.com/amansagar070707-crypto/KaidonBlocks" }],
  },
  "logos-carousel": {
    name: "Logos Carousel",
    description: "Cycle through logos column by column in a staggered wave.",
    previewComponent: <LogosCarouselPreview />,
    codeSnippet: `import { LogosCarousel } from "@/components/logos-carousel"
import { SPONSORS } from "@/features/sponsor/data"

export default function LogosCarouselDemo() {
  return (
    <LogosCarousel className="w-full py-4 text-foreground">
      {SPONSORS.map((sponsor, index) => (
        <sponsor.logo key={index} className="h-auto w-full scale-105" />
      ))}
    </LogosCarousel>
  )
}`,
    installCommand: shadcnInstallCommand("logos-carousel"),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: logosCarouselSource,
        label: "components/logos-carousel.tsx",
        expandable: true,
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport,
    usageExample,
    a11yNotes:
      "When reduced motion is enabled, staggered wave transitions should stop and logos should render statically in place.",
    apiProps: defaultApiProps,
    credits: [{ label: "Devouring Details", href: "https://chanhdai.com" }],
  },
}

export function getFallbackComponentDetail(slug: string): ComponentDetailPageProps {
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return {
    name,
    description: `A production-ready ${name} component for agent interfaces.`,
    previewComponent: (
      <div className="flex min-h-24 w-full items-center justify-center rounded-md border border-border bg-card px-4 font-mono text-sm">
        {name}
      </div>
    ),
    codeSnippet: `import { ${name.replace(/\s+/g, "")} } from "@/components/${slug}"

export default function Demo() {
  return <${name.replace(/\s+/g, "")} />
}`,
    installCommand: shadcnInstallCommand(slug),
    manualSteps: [
      { title: "Install the following dependencies" },
      { title: "Add a cn helper", code: cnHelper, label: "lib/utils.ts" },
      {
        title: "Copy and paste the following code into your project",
        code: `export function ${name.replace(/\s+/g, "")}() {
  return <div>${name}</div>
}`,
        label: `components/${slug}.tsx`,
      },
      { title: "Update the import paths to match your project setup" },
    ],
    usageImport: `import { ${name.replace(/\s+/g, "")} } from "@/components/${slug}"`,
    usageExample: `<${name.replace(/\s+/g, "")} />`,
    a11yNotes:
      "Keep motion optional and preserve readable static states for users who request reduced motion.",
    apiProps: defaultApiProps,
    credits: [{ label: "KaidonBlocks", href: "https://github.com/amansagar070707-crypto/KaidonBlocks" }],
  }
}

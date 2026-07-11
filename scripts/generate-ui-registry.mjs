#!/usr/bin/env node

/**
 * Generates a shadcn-compatible static registry for Pixel UI.
 *
 * Output:
 * - apps/docs/public/r/registry.json
 * - apps/docs/public/r/{component}.json
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json"
const REGISTRY_ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json"
const PRODUCT_URL = "https://pixel.amansagar.in"
const REGISTRY_URL = "https://registry.pixel-ui.amansagar.in"

const rootDir = process.cwd()
const docsDir = join(rootDir, "apps", "docs")
const outputDir = join(docsDir, "public", "r")
const aiElementsDir = join(docsDir, "src", "components", "ai-elements")
const uiDir = join(docsDir, "src", "components", "ui")

const aiElementComponents = [
  { name: "Conversation", slug: "conversation", category: "I/O surfaces", description: "Scrollable chat surface with pinned-bottom behavior.", isNew: true },
  { name: "Message", slug: "message", category: "I/O surfaces", description: "Role-aware chat message shell.", isNew: true },
  { name: "Message Content", slug: "message-content", category: "I/O surfaces", description: "Readable message body for streamed text.", isNew: true },
  { name: "Message Avatar", slug: "message-avatar", category: "I/O surfaces", description: "Avatar slot pattern for message rows.", isNew: true },
  { name: "Prompt Input", slug: "prompt-input", category: "I/O surfaces", description: "Composer form with attachment and submit primitives.", isNew: true },
  { name: "Tool", slug: "tool", category: "Tools", description: "Expandable tool call with status, input, and output states.", isNew: true },
  { name: "Reasoning", slug: "reasoning", category: "Reasoning", description: "Collapsible reasoning disclosure with streaming state.", isNew: true },
  { name: "Chain Of Thought", slug: "chain-of-thought", category: "Reasoning", description: "Step-by-step reasoning timeline disclosure.", isNew: true },
  { name: "Task", slug: "task", category: "Reasoning", description: "Collapsible task step list for agent work.", isNew: true },
  { name: "Queue", slug: "queue", category: "Reasoning", description: "Grouped queue for pending, running, and completed work.", isNew: true },
  { name: "Plan", slug: "plan", category: "Reasoning", description: "Expandable plan card for multi-step execution.", isNew: true },
  { name: "Attachments", slug: "attachments", category: "I/O surfaces", description: "File chip and preview primitives for prompt input.", isNew: true },
  { name: "Source", slug: "source", category: "Memory", description: "Citation/source link primitive from AI Elements sources.", isNew: true },
  { name: "Branch", slug: "branch", category: "Memory", description: "Message branch selector and alternate response controls.", isNew: true },
  { name: "Artifact", slug: "artifact", category: "Memory", description: "Document/artifact panel for generated output.", isNew: true },
  { name: "Actions", slug: "actions", category: "Guardrails", description: "Inline message action buttons for copy, retry, and vote flows.", isNew: true },
  { name: "Suggestion", slug: "suggestion", category: "Guardrails", description: "Prompt suggestion chips for guided next actions.", isNew: true },
  { name: "Loader", slug: "loader", category: "Guardrails", description: "Loading and shimmer feedback for agent states.", isNew: true },
  { name: "Code Block", slug: "code-block", category: "Tools", description: "Syntax-highlighted code container with copy controls.", isNew: true },
  { name: "Terminal", slug: "terminal", category: "Tools", description: "Terminal output surface with status and actions.", isNew: true },
  { name: "File Tree", slug: "file-tree", category: "Tools", description: "Navigable file tree for generated workspaces.", isNew: true },
  { name: "Checkpoint", slug: "checkpoint", category: "Tools", description: "Checkpoint marker and restore trigger.", isNew: true },
]

const essentialComponents = [
  { name: "Confirmation", slug: "confirmation", category: "Guardrails", description: "Approval and denial surfaces for high-impact tool calls.", isNew: true },
  { name: "Model Selector", slug: "model-selector", category: "I/O surfaces", description: "Provider and model switcher for multi-model agent products.", isNew: true },
  { name: "Sandbox", slug: "sandbox", category: "Tools", description: "Isolated execution preview for generated code and commands.", isNew: true },
  { name: "Web Preview", slug: "web-preview", category: "Tools", description: "Live browser preview for generated apps and artifacts.", isNew: true },
]

const inlineSourceBySlug = {
  confirmation: `export function Confirmation({
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
}
`,
  "model-selector": `export function ModelSelector({
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
        onChange={(event) => onChange(event.target.value)}
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
}
`,
  sandbox: `export function Sandbox({
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
}
`,
  "web-preview": `export function WebPreview({
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
}
`,
}

const sourceFileBySlug = {
  source: "sources",
  branch: "message",
  actions: "message",
  loader: "shimmer",
  "message-content": "message",
  "message-avatar": "message",
}

const ignoredDependencies = new Set([
  "react",
  "react-dom",
  "next",
  "next/link",
  "next/image",
])

const uiImportPattern = /from\s+["']@\/components\/ui\/([^"']+)["']/g
const localImportPattern = /from\s+["']\.\/([^"']+)["']/g
const bareImportPattern = /(?:from\s+["']([^"']+)["']|import\s+["']([^"']+)["'])/g

function readSourceFile(path) {
  return readFileSync(path, "utf8")
}

function sourceNameForSlug(slug) {
  return sourceFileBySlug[slug] ?? slug
}

function stripExtension(fileName) {
  return fileName.replace(/\.(tsx|ts|jsx|js)$/, "")
}

function aiElementPath(sourceName) {
  return join(aiElementsDir, `${sourceName}.tsx`)
}

function uiComponentPath(sourceName) {
  return join(uiDir, `${sourceName}.tsx`)
}

function collectExternalDependencies(contents) {
  const dependencies = new Set()

  for (const content of contents) {
    for (const match of content.matchAll(bareImportPattern)) {
      const specifier = match[1] ?? match[2]
      if (
        !specifier ||
        specifier.startsWith(".") ||
        specifier.startsWith("@/") ||
        ignoredDependencies.has(specifier)
      ) {
        continue
      }

      dependencies.add(specifier)
    }
  }

  return Array.from(dependencies).sort()
}

function collectFilesForComponent(slug) {
  if (inlineSourceBySlug[slug]) {
    return [
      {
        path: `registry/pixel-ui/ai/${slug}.tsx`,
        type: "registry:ui",
        target: `@ui/ai/${slug}.tsx`,
        content: inlineSourceBySlug[slug],
      },
    ]
  }

  const sourceName = sourceNameForSlug(slug)
  const files = new Map()
  const pendingAiFiles = [sourceName]
  const pendingUiFiles = []

  const addFile = (file) => {
    if (!files.has(file.target)) {
      files.set(file.target, file)
    }
  }

  while (pendingAiFiles.length > 0) {
    const currentSource = pendingAiFiles.shift()
    if (!currentSource) continue

    const sourcePath = aiElementPath(currentSource)
    if (!existsSync(sourcePath)) {
      throw new Error(`Missing AI element source for "${slug}": ${sourcePath}`)
    }

    const content = readSourceFile(sourcePath)
    addFile({
      path: `registry/pixel-ui/ai/${currentSource}.tsx`,
      type: "registry:ui",
      target: `@ui/ai/${currentSource}.tsx`,
      content,
    })

    for (const match of content.matchAll(uiImportPattern)) {
      const uiSource = stripExtension(match[1])
      if (!files.has(`@ui/${uiSource}.tsx`)) {
        pendingUiFiles.push(uiSource)
      }
    }

    for (const match of content.matchAll(localImportPattern)) {
      const localSource = stripExtension(match[1])
      const localPath = aiElementPath(localSource)
      const localTarget = `@ui/ai/${localSource}.tsx`
      if (existsSync(localPath) && !files.has(localTarget)) {
        pendingAiFiles.push(localSource)
      }
    }
  }

  while (pendingUiFiles.length > 0) {
    const currentSource = pendingUiFiles.shift()
    if (!currentSource) continue

    const sourcePath = uiComponentPath(currentSource)
    const target = `@ui/${currentSource}.tsx`
    if (!existsSync(sourcePath) || files.has(target)) {
      continue
    }

    const content = readSourceFile(sourcePath)
    addFile({
      path: `registry/pixel-ui/ui/${currentSource}.tsx`,
      type: "registry:ui",
      target,
      content,
    })

    for (const match of content.matchAll(uiImportPattern)) {
      const uiSource = stripExtension(match[1])
      if (!files.has(`@ui/${uiSource}.tsx`)) {
        pendingUiFiles.push(uiSource)
      }
    }
  }

  return Array.from(files.values())
}

function createRegistryItem(component) {
  const files = collectFilesForComponent(component.slug)
  const dependencies = collectExternalDependencies(
    files.map((file) => file.content ?? "")
  )

  return {
    "$schema": REGISTRY_ITEM_SCHEMA,
    name: component.slug,
    type: "registry:ui",
    title: component.name,
    description: component.description,
    dependencies,
    registryDependencies: [],
    files,
    categories: [component.category],
    meta: {
      source: "pixel-ui",
      agentic: true,
      productUrl: PRODUCT_URL,
      registryUrl: `${REGISTRY_URL}/r/${component.slug}.json`,
      componentPage: `${PRODUCT_URL}/components/${component.slug}`,
    },
  }
}

function createCatalogItem(item) {
  return {
    ...item,
    files: item.files.map(({ content, ...file }) => file),
  }
}

if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true })
}

mkdirSync(outputDir, { recursive: true })

const items = [...aiElementComponents, ...essentialComponents].map(createRegistryItem)
const catalog = {
  "$schema": REGISTRY_SCHEMA,
  name: "pixel-ui",
  homepage: PRODUCT_URL,
  items: items.map(createCatalogItem),
}

writeFileSync(join(outputDir, "registry.json"), `${JSON.stringify(catalog, null, 2)}\n`)

for (const item of items) {
  writeFileSync(join(outputDir, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`)
}

console.log(`Generated ${items.length} registry items in ${outputDir}`)
console.log(`Catalog: ${join(outputDir, "registry.json")}`)

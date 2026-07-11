"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function ConfirmationPreview() {
  const [status, setStatus] = useState<"idle" | "approved" | "denied">("idle")

  return (
    <div className="flex flex-col items-center gap-4 p-6 transition-all duration-150">
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150",
        status === "approved" && "bg-green-500/10 text-green-600 dark:text-green-400",
        status === "denied" && "bg-red-500/10 text-red-600 dark:text-red-400",
        status === "idle" && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      )}>
        {status === "approved" ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : status === "denied" ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {status === "approved" ? "Approved" : status === "denied" ? "Denied" : "Delete file?"}
        </p>
        {status === "idle" && (
          <p className="mt-1 text-xs text-muted-foreground">This action cannot be undone.</p>
        )}
      </div>
      {status === "idle" ? (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setStatus("denied")}>Deny</Button>
          <Button size="sm" onClick={() => setStatus("approved")}>Approve</Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>Reset</Button>
      )}
    </div>
  )
}

function ModelSelectorPreview() {
  const [selected, setSelected] = useState("gpt-4o")
  const models = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  ]

  return (
    <div className="w-full max-w-xs p-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Model</label>
        <div className="relative">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} - {model.provider}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function SandboxPreview() {
  const [output, setOutput] = useState("$ ")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput("$ echo 'Hello, World!'\n")
    setTimeout(() => {
      setOutput((prev) => prev + "Hello, World!\n")
      setTimeout(() => {
        setOutput((prev) => prev + "$ ")
        setIsRunning(false)
      }, 500)
    }, 800)
  }

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-lg border border-border bg-[#1e1e1e]">
        <div className="flex items-center gap-1.5 border-b border-border bg-[#2d2d2d] px-3 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-gray-400">sandbox</span>
        </div>
        <div className="p-3 font-mono text-sm">
          <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
        </div>
        <div className="border-t border-border bg-[#2d2d2d] px-3 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="h-7 text-xs"
          >
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function WebPreviewPreview() {
  const [url, setUrl] = useState("https://example.com")

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 rounded-md border border-border bg-background px-2 py-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent font-mono text-xs focus:outline-none"
            />
          </div>
          <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div className="flex h-48 items-center justify-center bg-background p-4">
          <div className="text-center">
            <svg className="mx-auto h-8 w-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <p className="mt-2 text-xs text-muted-foreground">Preview</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EssentialPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "confirmation":
      return <ConfirmationPreview />
    case "model-selector":
      return <ModelSelectorPreview />
    case "sandbox":
      return <SandboxPreview />
    case "web-preview":
      return <WebPreviewPreview />
    default:
      return null
  }
}

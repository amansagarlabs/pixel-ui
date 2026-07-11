"use client"

import { motion, useReducedMotion } from "motion/react"
import * as React from "react"
import type { ComponentType } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageAction,
  MessageActions,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input"
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool"
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning"
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought"
import {
  Queue,
  QueueItem,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@/components/ai-elements/queue"
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from "@/components/ai-elements/task"
import {
  Plan,
  PlanContent,
  PlanDescription,
  PlanHeader,
  PlanTitle,
} from "@/components/ai-elements/plan"
import {
  Attachments,
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
} from "@/components/ai-elements/attachments"
import { Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ai-elements/sources"
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@/components/ai-elements/artifact"
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion"
import { CodeBlock } from "@/components/ai-elements/code-block"
import { Terminal } from "@/components/ai-elements/terminal"
import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/ai-elements/file-tree"
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Copy, CornerDownLeft, FileText, Globe, RefreshCcw } from "lucide-react"

const attachmentData = [
  { id: "trace", type: "file" as const, filename: "trace.json", mediaType: "application/json", url: "" },
  { id: "policy", type: "file" as const, filename: "policy.md", mediaType: "text/markdown", url: "" },
]

const queueItems: Array<{ title: string; completed: boolean; description: string }> = [
  { title: "Fetch traces", completed: true, description: "Completed from registry logs" },
  { title: "Run evaluator", completed: false, description: "Waiting on model response" },
  { title: "Write release note", completed: false, description: "Pending approval" },
]

const MotionDiv = motion.div as unknown as ComponentType<any>

export function ConversationPreview({ compact = false }: { compact?: boolean }) {
  const shouldReduceMotion = useReducedMotion() ?? false

  const turns = [
    {
      from: "user" as const,
      side: "right" as const,
      text: "Can you show what you built on amansagar.in?",
      delay: 0,
    },
    {
      from: "assistant" as const,
      side: "left" as const,
      text: "Yes. **amansagar.in** showcases AI agent primitives, docs, and registry-driven UI with production-ready previews.",
      delay: 0.08,
    },
    {
      from: "user" as const,
      side: "right" as const,
      text: "Make it feel like a real-time product demo.",
      delay: 0.16,
    },
    {
      from: "assistant" as const,
      side: "left" as const,
      text: "Done. The conversation surface updates like a live assistant, with smooth scroll and clear handoff between input and output.",
      delay: 0.24,
    },
    {
      from: "user" as const,
      side: "right" as const,
      text: "What should visitors remember?",
      delay: 0.32,
    },
    {
      from: "assistant" as const,
      side: "left" as const,
      text: "amansagar.in is a showcase for agent UX, not just a portfolio. It demonstrates primitives, workflows, and marketing-friendly proof points.",
      delay: 0.4,
    },
  ]

  return (
    <div className="w-full">
      <Conversation className={compact ? "h-56" : "h-[28rem]"}>
        <ConversationContent className="gap-5 p-4">
          {turns.map((turn, index) => (
            <MotionDiv
              key={`${turn.side}-${index}`}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              className={turn.side === "right" ? "ml-auto max-w-[84%]" : "mr-auto max-w-[88%]"}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              transition={{ duration: 0.32, delay: turn.delay, ease: "easeOut" }}
            >
              <Message from={turn.from}>
                <MessageContent>
                  {turn.from === "assistant" ? <MessageResponse>{turn.text}</MessageResponse> : turn.text}
                </MessageContent>
              </Message>
            </MotionDiv>
          ))}
        </ConversationContent>
      </Conversation>
    </div>
  )
}

export function MessagePreview() {
  return (
    <div className="w-full space-y-3">
      <Message from="assistant">
        <MessageContent>Deployment risk is medium.</MessageContent>
      </Message>
      <Message from="user">
        <MessageContent>Show the failed checks.</MessageContent>
      </Message>
    </div>
  )
}

export function MessageContentPreview() {
  return (
    <Message from="assistant" className="w-full">
      <MessageContent className="space-y-2">
        <p className="font-medium">Trace summary</p>
        <p className="text-muted-foreground">Two retries passed. One approval rule still needs a reviewer.</p>
      </MessageContent>
    </Message>
  )
}

export function MessageAvatarPreview() {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces" alt="AI avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <Message from="assistant" className="max-w-none">
          <MessageContent>Reviewer assigned to approval queue.</MessageContent>
        </Message>
      </div>
      <div className="flex items-start justify-end gap-3">
        <Message from="user" className="max-w-none">
          <MessageContent>Notify me after the fix lands.</MessageContent>
        </Message>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces" alt="User avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export function ToolPreview() {
  return (
    <Tool className="w-full scale-[0.92] origin-top overflow-hidden rounded-lg border-border/70 bg-background/95" defaultOpen>
      <ToolHeader state="input-available" type="tool-readFile" />
      <ToolContent className="max-h-[138px] overflow-y-auto">
        <ToolInput input={{ path: "registry/approval/index.ts" }} />
        <ToolOutput output="Parsed approval policy and retry guard." errorText={undefined} />
      </ToolContent>
    </Tool>
  )
}

export function PromptInputPreview({ compact = false }: { compact?: boolean } = {}) {
  const [modelOpen, setModelOpen] = React.useState(false)
  const [actionsOpen, setActionsOpen] = React.useState(false)
  const [prompt, setPrompt] = React.useState("")
  const [scrollState, setScrollState] = React.useState({
    canScroll: false,
    scrollTop: 0,
    clientHeight: 0,
    scrollHeight: 0,
  })
  const models = [
    { id: "claude", name: "Claude 3.5 Sonnet", description: "Advanced reasoning" },
    { id: "gpt4o", name: "GPT-4o", description: "Fast general model" },
    { id: "gemini", name: "Gemini 2.0 Flash", description: "Quick multimodal model" },
  ]
  const actions = [
    { id: "search", name: "Search", description: "Web and document search", icon: Globe },
    { id: "upload", name: "Add photos & files", description: "Upload from computer", icon: FileText },
    { id: "thinking", name: "Thinking mode", description: "Structured reasoning", icon: RefreshCcw },
  ]
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const scrollTrackRef = React.useRef<HTMLDivElement | null>(null)
  const dragStateRef = React.useRef<{ active: boolean; offsetRatio: number }>({
    active: false,
    offsetRatio: 0,
  })
  const [selectedModelId, setSelectedModelId] = React.useState(models[0].id)
  const selectedModel = models.find((model) => model.id === selectedModelId) ?? models[0]

  React.useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "0px"
    const minHeight = compact ? 38 : 88
    const maxHeight = compact ? 76 : 192
    const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
    textarea.style.height = `${nextHeight}px`
    setScrollState({
      canScroll: textarea.scrollHeight > textarea.clientHeight + 2,
      scrollTop: textarea.scrollTop,
      clientHeight: textarea.clientHeight,
      scrollHeight: textarea.scrollHeight,
    })
  }, [compact, prompt])

  const handlePromptScroll = React.useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    setScrollState({
      canScroll: textarea.scrollHeight > textarea.clientHeight + 2,
      scrollTop: textarea.scrollTop,
      clientHeight: textarea.clientHeight,
      scrollHeight: textarea.scrollHeight,
    })
  }, [])

  const thumbHeight =
    scrollState.scrollHeight > 0 && scrollState.clientHeight > 0
      ? Math.max((scrollState.clientHeight / scrollState.scrollHeight) * 100, 18)
      : 100
  const maxThumbTop = 100 - thumbHeight
  const thumbTop =
    scrollState.scrollHeight > scrollState.clientHeight
      ? Math.min(
          maxThumbTop,
          (scrollState.scrollTop /
            Math.max(scrollState.scrollHeight - scrollState.clientHeight, 1)) *
            maxThumbTop
        )
      : 0

  const scrollToRatio = React.useCallback((ratio: number) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const maxScrollTop = Math.max(textarea.scrollHeight - textarea.clientHeight, 0)
    textarea.scrollTop = maxScrollTop * Math.max(0, Math.min(1, ratio))
    handlePromptScroll()
  }, [handlePromptScroll])

  const handleTrackPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return
    const track = scrollTrackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const thumbSize = (rect.height * thumbHeight) / 100
    const ratio = (event.clientY - rect.top - thumbSize / 2) / Math.max(rect.height - thumbSize, 1)
    scrollToRatio(ratio)
  }, [scrollToRatio, thumbHeight])

  const handleThumbPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const track = scrollTrackRef.current
    if (!track) return
    const thumb = event.currentTarget
    const thumbRect = thumb.getBoundingClientRect()
    dragStateRef.current = {
      active: true,
      offsetRatio: thumbRect.height > 0 ? (event.clientY - thumbRect.top) / thumbRect.height : 0,
    }
    const onMove = (moveEvent: globalThis.PointerEvent) => {
      if (!dragStateRef.current.active) return
      const trackRect = track.getBoundingClientRect()
      const thumbSize = (trackRect.height * thumbHeight) / 100
      const ratio =
        (moveEvent.clientY - trackRect.top - dragStateRef.current.offsetRatio * thumbSize) /
        Math.max(trackRect.height - thumbSize, 1)
      scrollToRatio(ratio)
    }
    const onUp = () => {
      dragStateRef.current.active = false
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    thumb.setPointerCapture(event.pointerId)
  }, [scrollToRatio, thumbHeight])

  return (
    <div className={cn("w-full overflow-hidden rounded-[20px] border border-border/80 bg-card p-2 shadow-sm", compact && "mx-auto max-w-[380px]")}>
      <div className={cn("rounded-[16px] bg-background/85 backdrop-blur-sm", compact ? "relative flex h-[146px] flex-col p-2" : "p-2.5")}>
        <div className={cn("relative", compact && "flex-1")}>
        <textarea
          ref={textareaRef}
          aria-label="Prompt input"
          rows={1}
          className={cn(
            "block w-full resize-none overflow-y-auto bg-transparent px-2 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            compact ? "max-h-16 pb-0 pr-7 pt-0.5 text-[13px] leading-5" : "max-h-48 pb-1 pr-8"
          )}
          placeholder="What would you like to know?"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onScroll={handlePromptScroll}
        />
          {scrollState.canScroll ? (
            <div
              ref={scrollTrackRef}
              className={cn(
                "absolute right-1 z-10 touch-none select-none rounded-full bg-transparent",
                compact ? "top-1 bottom-1 w-3" : "top-2 bottom-2 w-3.5"
              )}
              onPointerDown={handleTrackPointerDown}
            >
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 cursor-grab rounded-full bg-border/60 transition-all duration-150 hover:bg-border/80 active:cursor-grabbing",
                  compact ? "w-1.5" : "w-1.5"
                )}
                style={{
                  top: `${thumbTop}%`,
                  height: `${thumbHeight}%`,
                }}
                onPointerDown={handleThumbPointerDown}
              />
            </div>
          ) : null}
        </div>
        <div className={cn("flex items-end justify-between gap-2", compact ? "mt-2 pr-10" : "mt-4")}>
          <div className={cn("flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground", compact && "flex-nowrap gap-1.5")}>
          <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-sm font-medium text-muted-foreground transition-colors hover:border-border/70 hover:bg-accent/20 hover:text-foreground",
                  compact ? "h-7 w-7" : "h-9 w-10",
                  actionsOpen && "border-border/70 bg-accent/30 text-foreground"
                )}
              >
                <span className={cn("leading-none", compact ? "text-sm" : "text-lg")}>+</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={cn("overflow-hidden rounded-2xl border-border/70 p-2 shadow-xl", compact ? "w-72" : "w-80")}>
              <ScrollArea className={cn(compact ? "max-h-56" : "max-h-72")}>
                <div className={cn("space-y-1", compact ? "pr-1" : "pr-2")}>
                  {actions.map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className={cn(
                          "group flex items-start gap-3 rounded-xl border border-transparent outline-none transition-colors data-[highlighted]:border-border/70 data-[highlighted]:bg-accent/30",
                          compact ? "px-3 py-2.5" : "px-3 py-3"
                        )}
                        onSelect={(event) => event.preventDefault()}
                      >
                        <Icon className="mt-0.5 size-4 text-muted-foreground transition-colors group-data-[highlighted]:text-foreground" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </div>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <button type="button" className={cn("inline-flex shrink-0 items-center gap-2 rounded-full border border-transparent font-medium text-muted-foreground transition-colors hover:border-border/70 hover:bg-accent/20 hover:text-foreground", compact ? "h-7 px-2 text-[11px]" : "h-9 px-3")}>
            <Globe className="size-4" />
            <span>Search</span>
          </button>
          <DropdownMenu open={modelOpen} onOpenChange={setModelOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex h-9 min-w-[10rem] items-center justify-between gap-2 rounded-full border border-border/70 bg-background/70 px-3 font-medium text-foreground transition-colors hover:border-border hover:bg-accent/15",
                  compact && "h-7 min-w-[10.5rem] px-2.5 text-[11px]",
                  modelOpen && "border-foreground/20 bg-accent/30"
                )}
              >
                <span>{selectedModel.name}</span>
                <ChevronDown className={cn("text-muted-foreground", compact ? "size-3" : "size-3.5")} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 overflow-hidden rounded-2xl border-border/70 p-2 shadow-xl">
              <ScrollArea className="max-h-72">
                <div className="space-y-1 pr-1">
                  {models.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 outline-none transition-colors",
                        "hover:border-border/70 hover:bg-accent/30 focus:border-border/70 focus:bg-accent/30 data-[highlighted]:border-border/70 data-[highlighted]:bg-accent/30",
                        model.id === selectedModel.id && "border-border/70 bg-accent/25"
                      )}
                      onSelect={(event) => {
                        event.preventDefault()
                        setSelectedModelId(model.id)
                        setModelOpen(false)
                      }}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background text-[11px] font-semibold text-foreground">
                        {model.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground">{model.name}</div>
                        <div className="text-xs text-muted-foreground">{model.description}</div>
                      </div>
                      {model.id === selectedModel.id ? (
                        <Check className="mt-1 size-4 shrink-0 text-foreground" />
                      ) : null}
                    </DropdownMenuItem>
                  ))}
                </div>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

          <button type="button" className={cn("absolute bottom-2 right-2 inline-flex shrink-0 items-center justify-center bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90", compact ? "size-8 rounded-lg" : "size-10 rounded-xl")} aria-label="Send message">
            <CornerDownLeft className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ReasoningPreview() {
  return (
    <Reasoning defaultOpen className="w-full">
      <ReasoningTrigger />
      <ReasoningContent>
        {`1. Read the current queue state.
2. Compare the approval policy.
3. Return the shortest safe action.`}
      </ReasoningContent>
    </Reasoning>
  )
}

export function ChainOfThoughtPreview({ compact = false }: { compact?: boolean } = {}) {
  const shouldReduceMotion = useReducedMotion() ?? false

  if (compact) {
    return (
      <ChainOfThought defaultOpen className="w-full max-w-sm overflow-hidden">
        <ChainOfThoughtHeader>Trace decision path</ChainOfThoughtHeader>
        <ChainOfThoughtContent className="overflow-hidden">
          <ChainOfThoughtStep
            label="Found the GitHub profile for amansagar0607"
            description="Profile avatar and repository list"
            status="active"
          >
            <MotionDiv
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              className="overflow-hidden rounded-lg border border-border bg-muted p-1.5"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mx-auto flex w-fit flex-col items-center justify-center rounded-md border border-border/70 bg-background px-2 py-2">
                <Avatar className="size-[46px] border border-border/70">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/62849475?v=4"
                    alt="amansagar0607 GitHub avatar"
                  />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </div>
            </MotionDiv>
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    )
  }

  return (
    <ChainOfThought defaultOpen className={compact ? "w-full max-w-lg overflow-hidden" : "w-full"}>
      <ChainOfThoughtHeader>Trace decision path</ChainOfThoughtHeader>
      <ChainOfThoughtContent className={compact ? "overflow-hidden" : undefined}>
        <MotionDiv
          animate={shouldReduceMotion ? undefined : "visible"}
          className={compact ? "space-y-2" : "space-y-3"}
          initial={shouldReduceMotion ? false : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.06 },
            },
          }}
        >
          <ChainOfThoughtStep
            label="Search queue state"
            description="Matched pending approval records."
            status="active"
          >
            <ChainOfThoughtSearchResults className="max-w-full">
              {["www.x.com", "www.instagram.com", "www.github.com"].map((result) => (
                <MotionDiv
                  key={result}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-flex"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <ChainOfThoughtSearchResult>{result}</ChainOfThoughtSearchResult>
                </MotionDiv>
              ))}
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            label="Found the GitHub profile for amansagar0607"
            description="Profile avatar and repository list"
            status="active"
          >
            <MotionDiv
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              className={compact ? "overflow-hidden rounded-lg border border-border bg-muted p-2" : "overflow-hidden rounded-lg border border-border bg-muted p-3"}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={compact ? "mx-auto flex min-h-24 max-w-44 flex-col items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background px-2.5 py-3" : "mx-auto flex min-h-40 max-w-72 flex-col items-center justify-center gap-3 rounded-md border border-border/70 bg-background px-4 py-5"}>
                <Avatar className={compact ? "size-16 border border-border/70" : "size-20 border border-border/70"}>
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/62849475?v=4"
                    alt="amansagar0607 GitHub avatar"
                  />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className={compact ? "text-xs font-medium text-foreground" : "text-sm font-medium text-foreground"}>amansagar0607</p>
                  <a
                    href="https://github.com/amansagar0607"
                    className={compact ? "break-all text-[10px] leading-tight text-muted-foreground hover:text-foreground" : "text-xs text-muted-foreground hover:text-foreground"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/amansagar0607
                  </a>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                GitHub avatar used as the profile image for the repository search preview.
              </p>
            </MotionDiv>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            label="Searching GitHub repositories..."
            description="Recent repository names surfaced from the profile."
            status="pending"
          >
            <ChainOfThoughtSearchResults>
              {["github.com/amansagar0607", "repositories", "profile"].map((result) => (
                <MotionDiv
                  key={result}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-flex"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <ChainOfThoughtSearchResult>{result}</ChainOfThoughtSearchResult>
                </MotionDiv>
              ))}
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
        </MotionDiv>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}

export function TaskPreview() {
  return (
    <Task defaultOpen className="w-full">
      <TaskTrigger title="Review deployment risk" />
      <TaskContent>
        <TaskItem>Inspect approval mismatch</TaskItem>
        <TaskItem>
          Patch import map <TaskItemFile>policy.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>Generate rollout note</TaskItem>
      </TaskContent>
    </Task>
  )
}

export function QueuePreview() {
  return (
    <Queue className="w-full">
      <QueueSection defaultOpen>
        <QueueSectionTrigger>
          <QueueSectionLabel count={3} label="Queued" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            {queueItems.map(({ title, completed, description }) => (
              <QueueItem key={title}>
                <span className="flex items-start gap-2">
                  <QueueItemIndicator completed={completed} />
                  <QueueItemContent completed={completed}>{title}</QueueItemContent>
                </span>
                <QueueItemDescription completed={completed}>{description}</QueueItemDescription>
              </QueueItem>
            ))}
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  )
}

export function PlanPreview({ compact = false }: { compact?: boolean } = {}) {
  return (
    <Plan
      defaultOpen
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border/80 bg-card",
        compact ? "max-w-[320px]" : "max-w-3xl"
      )}
    >
      <PlanHeader className={cn("border-b border-border/70 bg-muted/30", compact ? "px-3 py-2" : "px-5 py-4")}>
        <div className={cn("space-y-1", compact && "space-y-0.5")}>
          <PlanTitle className={cn(compact && "text-[13px] leading-tight")}>Ship agent dashboard</PlanTitle>
          <PlanDescription className={cn("text-muted-foreground/90", compact && "text-[10px] leading-tight")}>
            Shared execution plan for the current repo state and next best actions.
          </PlanDescription>
        </div>
      </PlanHeader>
      <PlanContent className={cn(compact ? "px-2.5 pb-2.5 pt-1.5" : "px-4 pb-4 pt-2")}>
        <div className={cn("relative", compact ? "space-y-1.5" : "space-y-3")}>
          {[
            ['1', 'Install registry primitives', 'in progress'],
            ['2', 'Wire approval queue', 'pending'],
            ['3', 'Verify trace timeline', 'pending'],
          ].map(([index, title, state]) => (
            <div
              key={title}
              className={cn(
                "relative flex items-center gap-3 rounded-lg border transition-colors",
                compact ? "px-2 py-1.5" : "px-3 py-3",
                state === 'in progress'
                  ? 'border-border/80 bg-accent/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                  : 'border-border/70 bg-background/60'
              )}
            >
              <div className={cn("relative flex shrink-0 justify-center self-stretch", compact ? "w-[24px]" : "w-8")}>
                <div aria-hidden="true" className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/50" />
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex items-center justify-center rounded-full border font-mono",
                    state === 'in progress'
                      ? 'border-border bg-card text-foreground'
                      : 'border-border/70 bg-background text-muted-foreground',
                    compact ? "size-[20px] text-[8px]" : "size-7 text-[10px]"
                  )}
                >
                  {index}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn(compact ? "text-[11px] leading-tight" : "text-sm", state === 'in progress' ? 'font-semibold text-foreground' : 'font-medium text-foreground')}>
                    {title}
                  </p>
                  <span className={cn("rounded-full border border-border/70 font-mono uppercase tracking-wide text-muted-foreground", compact ? "px-1.25 py-0.5 text-[7px]" : "px-2.5 py-0.5 text-[10px]")}>
                    {state}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PlanContent>
    </Plan>
  )
}

export function AttachmentsPreview() {
  return (
    <Attachments variant="inline" className="w-full">
      {attachmentData.map((data) => (
        <Attachment key={data.filename} data={data}>
          <AttachmentPreview />
          <AttachmentInfo />
        </Attachment>
      ))}
    </Attachments>
  )
}

export function SourcesPreview() {
  return (
    <Sources className="w-full">
      <SourcesTrigger count={2} />
      <SourcesContent>
        <Source href="https://elements.ai-sdk.dev/" title="AI Elements" />
        <Source href="https://ai-sdk.dev/" title="Vercel AI SDK" />
      </SourcesContent>
    </Sources>
  )
}

export function BranchPreview() {
  return (
    <MessageBranch className="w-full">
      <MessageBranchContent>
        <Message key="one" from="assistant">
          <MessageContent>Option A keeps approval manual.</MessageContent>
        </Message>
        <Message key="two" from="assistant">
          <MessageContent>Option B auto-routes low-risk runs.</MessageContent>
        </Message>
      </MessageBranchContent>
      <MessageBranchSelector>
        <MessageBranchPrevious />
        <MessageBranchPage />
        <MessageBranchNext />
      </MessageBranchSelector>
    </MessageBranch>
  )
}

export function ArtifactPreview() {
  return (
    <Artifact className="w-full">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>approval-policy.md</ArtifactTitle>
          <ArtifactDescription>Generated rollout artifact</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={Copy} label="Copy" />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="space-y-2 text-xs text-muted-foreground">
        <div className="font-mono text-foreground">## Release checklist</div>
        <div>- Verify queue state</div>
        <div>- Attach trace evidence</div>
      </ArtifactContent>
    </Artifact>
  )
}

export function ActionsPreview() {
  return (
    <div className="w-full space-y-3">
      <Message from="assistant">
        <MessageContent>Approval summary is ready.</MessageContent>
      </Message>
      <MessageActions>
        <MessageAction label="Copy" tooltip="Copy response">
          <Copy className="size-4" />
        </MessageAction>
        <MessageAction label="Retry" tooltip="Retry">
          <RefreshCcw className="size-4" />
        </MessageAction>
      </MessageActions>
    </div>
  )
}

export function SuggestionPreview() {
  return (
    <Suggestions className="w-full">
      <Suggestion suggestion="Summarize trace" />
      <Suggestion suggestion="Draft approval" />
      <Suggestion suggestion="Open artifact" />
    </Suggestions>
  )
}

export function CodePreview() {
  return (
    <CodeBlock
      code={`await agent.run({\n  task: "review trace",\n})`}
      language="tsx"
      className="w-full text-xs"
    />
  )
}

export function TerminalPreview() {
  return (
    <Terminal
      className="w-full"
      output={`$ pixel-ui add approval\n✔ copied registry source\n✔ generated tests`}
    />
  )
}

export function FileTreePreview() {
  return (
    <FileTree className="w-full" defaultExpanded={new Set(["registry"])} selectedPath="registry/approval.ts">
      <FileTreeFolder path="registry" name="registry">
        <FileTreeFile path="registry/approval.ts" name="approval.ts" />
        <FileTreeFile path="registry/trace.ts" name="trace.ts" />
      </FileTreeFolder>
      <FileTreeFile path="README.md" name="README.md" icon={<FileText className="size-4 text-muted-foreground" />} />
    </FileTree>
  )
}

export function CheckpointPreview() {
  return (
    <Checkpoint className="w-full">
      <CheckpointIcon />
      <CheckpointTrigger>Restore checkpoint</CheckpointTrigger>
      <Button size="sm" variant="ghost">v3</Button>
    </Checkpoint>
  )
}

export function LoaderPreview() {
  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-8 text-sm text-muted-foreground">
      <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      Running checkpoint
    </div>
  )
}

export function AiElementPreview({ slug }: { slug: string }) {
  if (slug === "conversation") return <ConversationPreview compact />
  if (slug === "message") return <MessagePreview />
  if (slug === "message-content") return <MessageContentPreview />
  if (slug === "message-avatar") return <MessageAvatarPreview />
  if (slug === "tool") return <ToolPreview />
  if (slug === "terminal") return <TerminalPreview />
  if (slug === "file-tree") return <FileTreePreview />
  if (slug === "code-block") return <CodePreview />
  if (slug === "checkpoint") return <CheckpointPreview />
  if (slug.includes("prompt")) return <PromptInputPreview />
  if (slug === "reasoning") return <ReasoningPreview />
  if (slug === "chain-of-thought") return <ChainOfThoughtPreview />
  if (slug === "task") return <TaskPreview />
  if (slug === "queue") return <QueuePreview />
  if (slug === "plan") return <PlanPreview />
  if (slug.includes("attachment")) return <AttachmentsPreview />
  if (slug.includes("loader")) return <LoaderPreview />
  if (slug === "source") return <SourcesPreview />
  if (slug === "branch") return <BranchPreview />
  if (slug === "artifact") return <ArtifactPreview />
  if (slug === "actions") return <ActionsPreview />
  if (slug === "suggestion") return <SuggestionPreview />
  return <ConversationPreview compact />
}

export function CompactAiElementPreview({ slug }: { slug: string }) {
  if (slug === "chain-of-thought") return <ChainOfThoughtPreview compact />
  if (slug === "plan")
    return (
      <div className="flex h-full w-full items-start justify-center overflow-hidden px-3 pt-1">
        <div className="w-full max-w-[360px] origin-top scale-[0.86]">
          <PlanPreview compact />
        </div>
      </div>
    )
  if (slug.includes("prompt"))
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden px-3">
        <div className="w-full">
          <PromptInputPreview compact />
        </div>
      </div>
    )
  return <AiElementPreview slug={slug} />
}


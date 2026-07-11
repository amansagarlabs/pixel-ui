'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronRight, Clock, Cpu, Zap } from 'lucide-react'

/* ─── Streaming chat bubble ─────────────────────────────────────── */
const STREAM_SENTENCES = [
  'Searching knowledge base for matching primitives',
  'Found 3 relevant primitives: planner, tool-call-card, trace-timeline',
  'Composing agent response with structured output…',
]

function StreamingChatBubble() {
  const [sentenceIdx, setSentenceIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause'>('typing')

  useEffect(() => {
    const current = STREAM_SENTENCES[sentenceIdx]
    if (phase === 'typing') {
      if (charIdx < current.length) {
        const t = window.setTimeout(() => setCharIdx((c) => c + 1), 28)
        return () => clearTimeout(t)
      } else {
        const t = window.setTimeout(() => setPhase('pause'), 900)
        return () => clearTimeout(t)
      }
    } else {
      const t = window.setTimeout(() => {
        setSentenceIdx((i) => (i + 1) % STREAM_SENTENCES.length)
        setCharIdx(0)
        setPhase('typing')
      }, 600)
      return () => clearTimeout(t)
    }
  }, [charIdx, sentenceIdx, phase])

  const current = STREAM_SENTENCES[sentenceIdx]

  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/20 ring-1 ring-lime/30">
          <Cpu size={10} className="text-lime" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">agent</span>
        <div className="ml-auto flex h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
      </div>
      <p className="font-mono text-xs text-foreground/85 leading-5 min-h-[2.5rem]">
        {current.slice(0, charIdx)}
        {phase === 'typing' && (
          <span className="inline-block w-0.5 h-3.5 bg-lime ml-px animate-blink align-middle" />
        )}
      </p>
    </div>
  )
}

/* ─── Tool-call card ────────────────────────────────────────────── */
const TOOL_STAGES = [
  { label: 'Validating schema', pct: 30 },
  { label: 'Executing tool call', pct: 62 },
  { label: 'Awaiting approval', pct: 85 },
  { label: 'Complete', pct: 100 },
]

function ToolCallCard() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t = window.setInterval(
      () => setStage((s) => (s + 1) % TOOL_STAGES.length),
      1800,
    )
    return () => clearInterval(t)
  }, [])

  const current = TOOL_STAGES[stage]
  const isDone = current.pct === 100

  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={11} className="text-muted-foreground" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            tool-call-card
          </span>
        </div>
        <span
          className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border ${
            isDone
              ? 'border-lime/30 bg-lime/10 text-lime'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
          }`}
        >
          {isDone ? 'done' : 'running'}
        </span>
      </div>
      <div className="font-mono text-xs text-foreground/90 mb-2">browser.search</div>
      <div className="h-1 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-lime transition-all duration-700 ease-out"
          style={{ width: `${current.pct}%` }}
        />
      </div>
      <div className="mt-1.5 font-mono text-[10px] text-muted-foreground">{current.label}</div>
    </div>
  )
}

/* ─── Trace timeline ────────────────────────────────────────────── */
const TRACE_STEPS = [
  { label: 'plan_goal', ms: '12ms', done: true },
  { label: 'tool_call', ms: '340ms', done: true },
  { label: 'memory_recall', ms: '89ms', done: true },
  { label: 'format_output', ms: '—', done: false },
]

function TraceTimeline() {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 mb-2.5">
        <Clock size={11} className="text-muted-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">trace-timeline</span>
      </div>
      <ol className="space-y-1.5">
        {TRACE_STEPS.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-sm border shrink-0 flex items-center justify-center ${
                step.done
                  ? 'border-lime/60 bg-lime/15'
                  : 'border-border bg-transparent'
              }`}
            >
              {step.done && <Check size={8} className="text-lime" />}
            </div>
            <span className="font-mono text-[10px] text-foreground/70 flex-1">{step.label}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{step.ms}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ─── Browser chrome wrapper ────────────────────────────────────── */
export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Outer glow */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-lime/5 blur-2xl" />

      {/* Browser chrome */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/60">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 border-b border-border bg-[#0d0d0d] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
          </div>
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1">
            <ChevronRight size={10} className="text-muted-foreground/50" />
            <span className="font-mono text-[10px] text-muted-foreground/60">localhost:3000/agent</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-3">
          {/* Header row */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Agent Runtime
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              <span className="font-mono text-[10px] text-lime">active</span>
            </div>
          </div>

          <StreamingChatBubble />
          <ToolCallCard />
          <TraceTimeline />
        </div>
      </div>
    </div>
  )
}

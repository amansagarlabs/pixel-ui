'use client'

import Link from 'next/link'
import {
  Activity,
  Brain,
  Clock,
  Cpu,
  FileJson,
  GitBranch,
  Layers,
  ListTree,
  MessageSquare,
  RotateCcw,
  Shield,
  SlidersHorizontal,
  Sparkles,
  SquareTerminal,
  Workflow,
  Zap,
} from 'lucide-react'

interface ComponentEntry {
  name: string
  icon: React.ElementType
  isNew?: boolean
}

const NEW_COMPONENTS: ComponentEntry[] = [
  { name: 'Tool Call Card', icon: Zap, isNew: true },
  { name: 'Trace Timeline', icon: Clock, isNew: true },
  { name: 'Guardrail Confirm', icon: Shield, isNew: true },
  { name: 'Agent Canvas Node', icon: GitBranch, isNew: true },
  { name: 'Memory Recall', icon: Brain, isNew: true },
]

const ALL_COMPONENTS: ComponentEntry[] = [
  { name: 'Agent Canvas Node', icon: GitBranch },
  { name: 'Agent Status Pill', icon: Activity },
  { name: 'Approval Gate', icon: Shield },
  { name: 'Context Inspector', icon: ListTree },
  { name: 'Guardrail Confirm', icon: Shield, isNew: true },
  { name: 'Handoff Banner', icon: Workflow },
  { name: 'Memory Recall', icon: Brain, isNew: true },
  { name: 'Model Picker', icon: SlidersHorizontal },
  { name: 'Planner Steps', icon: Layers },
  { name: 'Reasoning Stream', icon: Sparkles },
  { name: 'Retry Boundary', icon: RotateCcw },
  { name: 'Schema Viewer', icon: FileJson },
  { name: 'Streaming Bubble', icon: MessageSquare },
  { name: 'Token Meter', icon: Cpu },
  { name: 'Tool Call Card', icon: Zap, isNew: true },
  { name: 'Trace Timeline', icon: Clock, isNew: true },
  { name: 'Run Terminal', icon: SquareTerminal },
]

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function ComponentCell({ entry }: { entry: ComponentEntry }) {
  const Icon = entry.icon
  return (
    <Link
      href={`/components/${toSlug(entry.name)}`}
      className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-secondary"
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-background text-muted-foreground transition-colors group-hover:text-foreground">
        <Icon size={14} aria-hidden="true" />
        {entry.isNew && (
          <span
            className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-lime"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="text-[13px] font-medium text-foreground">{entry.name}</span>
      {entry.isNew && <span className="sr-only">(new)</span>}
    </Link>
  )
}

export function ShowcaseGrid() {
  return (
    <section id="components" aria-labelledby="components-title">
      {/* New components */}
      <div className="border-b border-edge px-4 py-3 sm:px-6">
        <h2 id="components-title" className="font-mono text-xs text-muted-foreground">
          New components
        </h2>
      </div>
      <div className="grid border-b border-edge sm:grid-cols-2 lg:grid-cols-3">
        {NEW_COMPONENTS.map((entry, i) => (
          <div
            key={entry.name}
            className={`border-edge max-lg:[&:not(:nth-child(2n))]:sm:border-r lg:[&:not(:nth-child(3n))]:border-r ${
              i < NEW_COMPONENTS.length - 1 ? 'border-b sm:border-b-0' : ''
            } ${i < 3 ? '' : 'sm:border-t lg:border-t'}`}
          >
            <ComponentCell entry={entry} />
          </div>
        ))}
      </div>

      {/* Stripe divider */}
      <div className="stripes h-8 border-b border-edge" aria-hidden="true" />

      {/* All components */}
      <div className="flex items-center justify-between border-b border-edge px-4 py-3 sm:px-6">
        <h2 className="font-mono text-xs text-muted-foreground">
          {ALL_COMPONENTS.length} components
        </h2>
        <Link
          href="/components"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {ALL_COMPONENTS.map((entry, i) => (
          <div
            key={entry.name}
            className={`border-b border-edge max-lg:[&:not(:nth-child(2n))]:sm:border-r lg:[&:not(:nth-child(3n))]:border-r`}
          >
            <ComponentCell entry={entry} />
          </div>
        ))}
      </div>
    </section>
  )
}

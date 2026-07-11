'use client'

import { useState } from 'react'
import { SectionFrame } from '@/components/layout/page-frame'

const primitives = [
  { name: 'planner', code: `const planner = createPlanner({ model: 'gpt-4', maxSteps: 5 })` },
  { name: 'memory', code: `const memory = createMemory({ type: 'conversation', maxTokens: 4000 })` },
  { name: 'browser', code: `const browser = createBrowser({ headless: true })` },
  { name: 'evaluator', code: `const evaluator = createEvaluator({ criteria: ['relevance', 'accuracy'] })` },
  { name: 'reflection', code: `const reflection = createReflection({ maxIterations: 3 })` },
  { name: 'retry', code: `const retry = createRetry({ maxRetries: 3, backoff: 'exponential' })` },
  { name: 'approval', code: `const approval = createApproval({ threshold: 'medium' })` },
  { name: 'router', code: `const router = createRouter({ models: ['gpt-4', 'gpt-3.5-turbo'] })` },
  { name: 'telemetry', code: `const telemetry = createTelemetry({ service: 'my-agent' })` },
  { name: 'security', code: `const security = createSecurity({ rules: ['no-pii', 'no-harmful-content'] })` },
  { name: 'context', code: `const context = createContextManager({ maxTokens: 8000 })` },
]

export default function PlaygroundPage() {
  const [selected, setSelected] = useState('planner')
  const primitive = primitives.find(p => p.name === selected)

  return (
    <SectionFrame className="space-y-10 py-12">
      <div>
        <h1 className="mb-5 text-5xl font-semibold tracking-[-0.04em]">Playground</h1>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">
          Try out pixel-ui primitives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-1">
          {primitives.map(p => (
            <button
              key={p.name}
              onClick={() => setSelected(p.name)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selected === p.name
                  ? 'bg-foreground text-background'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-xs text-muted-foreground">TypeScript</span>
              <button
                onClick={() => navigator.clipboard.writeText(primitive?.code || '')}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Copy
              </button>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
              <pre>{primitive?.code}</pre>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

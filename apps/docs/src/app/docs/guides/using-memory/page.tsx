import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function UsingMemoryPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Guides</p>
          <h1 id="using-memory" className={PAGE_TITLE_CLASS}>
            Using Memory
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Learn how to use the memory primitive to give your agents persistent context and recall capabilities.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="memory-types" className="mb-3 text-2xl font-semibold">Memory Types</h2>
          <div className="space-y-3">
            {[
              { name: 'Short-term', desc: 'Session-based memory that exists for a single conversation.' },
              { name: 'Long-term', desc: 'Persistent memory that survives across sessions.' },
              { name: 'Hybrid', desc: 'Combination of short-term and long-term with automatic promotion.' },
            ].map((type) => (
              <div key={type.name} className="border border-border px-3 py-3">
                <h3 className="text-sm font-medium text-foreground">{type.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="setup" className="mb-3 text-2xl font-semibold">Setup</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { createMemory } from './primitives/memory'

const memory = createMemory({
  type: 'hybrid',
  embedding: 'openai',
  maxEntries: 5000,
  promotionThreshold: 3,
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="storing" className="mb-3 text-2xl font-semibold">Storing Information</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Store with metadata
await memory.store({
  key: 'user_preferences',
  value: { theme: 'dark', language: 'en' },
  tags: ['preferences', 'ui'],
  importance: 0.8,
})

// Store conversation context
await memory.store({
  key: 'conversation_123',
  value: { messages: [...], summary: 'Discussed pricing...' },
  tags: ['conversation'],
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="recalling" className="mb-3 text-2xl font-semibold">Recalling Information</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Semantic search
const results = await memory.recall('What theme does the user prefer?', {
  limit: 5,
  threshold: 0.7,
})

// Tag-based search
const prefs = await memory.recallByTag('preferences')

// Get specific entry
const entry = await memory.get('user_preferences')`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/building-agents">
            Previous: Building Agents
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/custom-primitives">
            Next: Custom Primitives
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

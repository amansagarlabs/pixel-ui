import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function PrimitivesPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Core Concepts</p>
          <h1 id="primitives" className={PAGE_TITLE_CLASS}>
            Primitives
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Primitives are the building blocks of pixel-ui. Each primitive is a self-contained module with UI, logic, and validation.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="what-are-primitives" className="mb-3 text-2xl font-semibold">What are Primitives?</h2>
          <p className="text-muted-foreground">
            A primitive is a copy-pasteable implementation pattern for AI agent interfaces. Each primitive includes:
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Component</strong> - The React UI surface</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Hook</strong> - Runtime state and adapter helpers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Schema</strong> - Zod input/output contract</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Types</strong> - TypeScript type definitions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Prompt</strong> - System prompt template (for AI primitives)</span>
            </li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="categories" className="mb-3 text-2xl font-semibold">Categories</h2>
          <div className="space-y-3">
            {[
              { name: 'Reasoning', desc: 'Planner, Chain of Thought, Reflection - break down complex tasks into steps.', href: '/primitives/planner' },
              { name: 'Memory', desc: 'Persistent and session memory for maintaining context across conversations.', href: '/primitives/memory' },
              { name: 'Tools', desc: 'Browser automation, file operations, API calls - agent capabilities.', href: '/primitives/browser' },
              { name: 'I/O Surfaces', desc: 'Message, Conversation, Terminal - how agents communicate.', href: '/components' },
              { name: 'Guardrails', desc: 'Approval, Security, Retry - safety and reliability patterns.', href: '/primitives/approval' },
            ].map((cat) => (
              <a key={cat.name} href={cat.href} className="block border border-border px-3 py-3 transition-colors hover:bg-secondary/30">
                <h3 className="text-sm font-medium text-foreground">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="using-primitives" className="mb-3 text-2xl font-semibold">Using Primitives</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Import from the primitive's index file
import { createPlanner } from './primitives/planner'

// Create an instance with configuration
const planner = createPlanner({
  model: 'gpt-4',
  maxSteps: 5,
})

// Use in your application
const plan = await planner.createPlan({
  goal: 'Research and summarize AI agent frameworks',
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="browsing-primitives" className="mb-3 text-2xl font-semibold">Browsing Primitives</h2>
          <p className="text-muted-foreground">
            Visit the <a href="/primitives" className="text-foreground underline underline-offset-4 hover:no-underline">Primitives</a> page
            to browse all available primitives with live previews and code examples.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/configuration">
            Previous: Configuration
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/components-guide">
            Next: Components
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

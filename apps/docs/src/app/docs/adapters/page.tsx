import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function AdaptersPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Core Concepts</p>
          <h1 id="adapters" className={PAGE_TITLE_CLASS}>
            Adapters
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Adapters connect primitives to your specific AI framework, model provider, or runtime environment.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="what-are-adapters" className="mb-3 text-2xl font-semibold">What are Adapters?</h2>
          <p className="text-muted-foreground">
            Adapters are thin wrappers that translate between pixel-ui primitives and your chosen framework.
            They handle API calls, response parsing, and framework-specific conventions.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="supported-adapters" className="mb-3 text-2xl font-semibold">Supported Adapters</h2>
          <div className="space-y-3">
            {[
              { name: 'Next.js', desc: 'Full-stack React framework with server components and API routes.' },
              { name: 'LangGraph', desc: 'Graph-based agent orchestration framework.' },
              { name: 'OpenAI Agents SDK', desc: 'Direct integration with OpenAI agent APIs.' },
              { name: 'Vercel AI SDK', desc: 'Streaming AI responses with React hooks.' },
              { name: 'Custom', desc: 'Build your own adapter for any framework.' },
            ].map((adapter) => (
              <div key={adapter.name} className="border border-border px-3 py-3">
                <h3 className="text-sm font-medium text-foreground">{adapter.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{adapter.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="using-adapters" className="mb-3 text-2xl font-semibold">Using Adapters</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Configure adapter in pixel-ui.json
{
  "adapter": "nextjs",
  "framework": "react",
  "primitives": ["planner", "memory"]
}

// Or use directly in code
import { createPlanner } from './primitives/planner'
import { NextJSAdapter } from './primitives/planner/adapters/nextjs'

const planner = createPlanner({
  model: 'gpt-4',
  adapter: new NextJSAdapter(),
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/schema">
            Previous: Schema & Validation
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/building-agents">
            Next: Building Agents
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

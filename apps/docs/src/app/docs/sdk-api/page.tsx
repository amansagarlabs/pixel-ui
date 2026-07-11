import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function SDKApiPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / API Reference</p>
          <h1 id="sdk-api" className={PAGE_TITLE_CLASS}>
            SDK API
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Reference documentation for the pixel-ui SDK factory functions and configuration APIs.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="factory-functions" className="mb-3 text-2xl font-semibold">Factory Functions</h2>
          <div className="space-y-3">
            {[
              { name: 'createPlanner()', desc: 'Creates a task planner that breaks goals into actionable steps.', file: 'packages/sdk/src/planner.ts' },
              { name: 'createMemory()', desc: 'Creates a memory store for persistent context.', file: 'packages/sdk/src/memory.ts' },
              { name: 'createReflection()', desc: 'Creates a reflection engine for self-improvement.', file: 'packages/sdk/src/reflection.ts' },
              { name: 'createRetry()', desc: 'Creates retry logic with exponential backoff.', file: 'packages/sdk/src/retry.ts' },
              { name: 'createApproval()', desc: 'Creates an approval workflow for sensitive actions.', file: 'packages/sdk/src/approval.ts' },
              { name: 'createRouter()', desc: 'Creates an intelligent request router.', file: 'packages/sdk/src/router.ts' },
            ].map((fn) => (
              <div key={fn.name} className="border border-border px-3 py-3">
                <h3 className="font-mono text-sm font-medium text-foreground">{fn.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{fn.desc}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{fn.file}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="usage-example" className="mb-3 text-2xl font-semibold">Usage Example</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { createPlanner, createMemory, createRetry } from '@pixel-ui/sdk'

// Create primitives
const planner = createPlanner({ model: 'gpt-4' })
const memory = createMemory({ type: 'hybrid' })
const retry = createRetry({ maxAttempts: 3 })

// Compose them
const result = await retry.execute(async () => {
  const context = await memory.recall(userQuery)
  return planner.createPlan({ goal: userQuery, context })
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/deployment">
            Previous: Deployment
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/registry-api">
            Next: Registry API
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

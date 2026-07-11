import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function SchemaPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Core Concepts</p>
          <h1 id="schema-validation" className={PAGE_TITLE_CLASS}>
            Schema & Validation
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Every primitive uses Zod schemas to define input/output contracts, ensuring type safety and runtime validation.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="why-schemas" className="mb-3 text-2xl font-semibold">Why Schemas?</h2>
          <p className="text-muted-foreground">
            Schemas serve three purposes in pixel-ui:
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Validation</strong> - Catch errors at runtime before they reach your agent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Type Safety</strong> - Generate TypeScript types automatically from schemas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span><strong className="text-foreground">Documentation</strong> - Schemas act as living documentation for your API</span>
            </li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="schema-structure" className="mb-3 text-2xl font-semibold">Schema Structure</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { z } from 'zod'

// Input schema - what the primitive accepts
export const PlannerInputSchema = z.object({
  goal: z.string().min(1).describe('The goal to plan for'),
  maxSteps: z.number().min(1).max(20).default(5),
  context: z.string().optional(),
})

// Output schema - what the primitive returns
export const PlannerOutputSchema = z.object({
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    dependencies: z.array(z.string()),
  })),
  summary: z.string(),
})

// Inferred types
export type PlannerInput = z.infer<typeof PlannerInputSchema>
export type PlannerOutput = z.infer<typeof PlannerOutputSchema>`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="validation-example" className="mb-3 text-2xl font-semibold">Validation Example</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Validation happens automatically
const planner = createPlanner({ model: 'gpt-4' })

// This will throw a ZodError if input is invalid
const plan = await planner.createPlan({
  goal: '', // Error: goal must be at least 1 character
  maxSteps: 50, // Error: maxSteps must be <= 20
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/components-guide">
            Previous: Components
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/adapters">
            Next: Adapters
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

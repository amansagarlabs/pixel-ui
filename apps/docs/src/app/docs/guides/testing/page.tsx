import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function TestingPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Guides</p>
          <h1 id="testing" className={PAGE_TITLE_CLASS}>
            Testing
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Test your primitives and agent interfaces to ensure reliability and correctness.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="test-command" className="mb-3 text-2xl font-semibold">Using the Test Command</h2>
          <p className="text-muted-foreground">
            pixel-ui includes a built-in test runner for primitives:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`# Test all installed primitives
npx pixel-ui test

# Test a specific primitive
npx pixel-ui test planner

# With coverage
npx pixel-ui test --coverage

# Verbose output
npx pixel-ui test --verbose`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="writing-tests" className="mb-3 text-2xl font-semibold">Writing Tests</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// planner.test.ts
import { describe, it, expect } from 'vitest'
import { createPlanner } from './planner'

describe('createPlanner', () => {
  it('should create a plan with valid input', async () => {
    const planner = createPlanner({ model: 'gpt-4' })
    const plan = await planner.createPlan({
      goal: 'Test goal',
    })
    expect(plan.steps).toBeDefined()
    expect(plan.steps.length).toBeGreaterThan(0)
  })

  it('should reject empty goal', async () => {
    const planner = createPlanner({ model: 'gpt-4' })
    await expect(
      planner.createPlan({ goal: '' })
    ).rejects.toThrow()
  })
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="doctor-command" className="mb-3 text-2xl font-semibold">Environment Check</h2>
          <p className="text-muted-foreground">
            Use the doctor command to check your environment for issues:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`npx pixel-ui doctor

# Output:
# ✓ Node.js version: 18.17.0
# ✓ Package manager: npm
# ✓ TypeScript: installed
# ✓ Primitives: 3 installed
# ✓ All checks passed!`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/custom-primitives">
            Previous: Custom Primitives
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/deployment">
            Next: Deployment
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

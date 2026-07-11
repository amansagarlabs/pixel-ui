import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function BuildingAgentsPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Guides</p>
          <h1 id="building-agents" className={PAGE_TITLE_CLASS}>
            Building Agents
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            A step-by-step guide to building AI agent interfaces with pixel-ui primitives.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="step-1-plan" className="mb-3 text-2xl font-semibold">Step 1: Plan Your Agent</h2>
          <p className="text-muted-foreground">
            Before writing code, define what your agent needs to do. Use the planner primitive to break down complex goals into manageable steps.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`const planner = createPlanner({ model: 'gpt-4' })
const plan = await planner.createPlan({
  goal: 'Build a customer support agent'
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="step-2-memory" className="mb-3 text-2xl font-semibold">Step 2: Add Memory</h2>
          <p className="text-muted-foreground">
            Give your agent persistent memory to remember past conversations and learned facts.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`const memory = createMemory({
  type: 'hybrid',
  maxEntries: 1000,
})

// Store facts
await memory.store({ key: 'user_preferences', value: {...} })

// Recall relevant context
const context = await memory.recall('What does the user prefer?')`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="step-3-tools" className="mb-3 text-2xl font-semibold">Step 3: Add Tools</h2>
          <p className="text-muted-foreground">
            Equip your agent with tools like browser automation, file operations, or API calls.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { Browser } from './primitives/browser'

const browser = new Browser()
await browser.navigate('https://example.com')
const content = await browser.extract('h1')`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="step-4-guardrails" className="mb-3 text-2xl font-semibold">Step 4: Add Guardrails</h2>
          <p className="text-muted-foreground">
            Implement safety checks with approval workflows and retry logic.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { Approval } from './primitives/approval'

const approval = new Approval({
  requireConfirmation: true,
  timeout: 30000,
})

// Agent must get approval before sensitive actions
const approved = await approval.request({
  action: 'send_email',
  details: { to: 'user@example.com', subject: 'Report' },
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="step-5-ui" className="mb-3 text-2xl font-semibold">Step 5: Build the UI</h2>
          <p className="text-muted-foreground">
            Use pixel-ui components to create the user interface for your agent.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { Conversation } from '@/components/ai-elements/conversation'
import { Message } from '@/components/ai-elements/message'
import { Reasoning } from '@/components/ai-elements/reasoning'

<Conversation>
  <Message role="user" content="Help me with..." />
  <Reasoning steps={plan.steps} />
  <Message role="assistant" content={response} />
</Conversation>`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/adapters">
            Previous: Adapters
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/using-memory">
            Next: Using Memory
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

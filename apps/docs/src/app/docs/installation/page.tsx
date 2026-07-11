import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'
import { InstallCommandBlock } from '@/components/install-command-block'

export default function InstallationPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Installation</p>
          <h1 id="installation" className={PAGE_TITLE_CLASS}>Installation</h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Get started with pixel ui in minutes.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="prerequisites" className="mb-3 text-2xl font-semibold">Prerequisites</h2>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>- Node.js 18 or higher</li>
            <li>- npm, pnpm, or yarn</li>
            <li>- TypeScript (recommended)</li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="initialize-project" className="mb-3 text-2xl font-semibold">Initialize project</h2>
          <p className="mb-3 text-muted-foreground">
            Run the init command to set up your project:
          </p>
          <InstallCommandBlock command="npx pixel-ui@latest init" />
          <p className="mt-2 text-xs text-muted-foreground">
            Creates pixel-ui.json and primitives/ directory.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="add-primitives" className="mb-3 text-2xl font-semibold">Add primitives</h2>
          <p className="mb-3 text-muted-foreground">
            Install primitives you need:
          </p>
          <InstallCommandBlock
            command={`# Add a planner
            npx pixel-ui@latest add planner

# Add memory
npx pixel-ui@latest add memory`}
          />
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="use-in-code" className="mb-3 text-2xl font-semibold">Use in code</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">TypeScript</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-code-foreground">
              <code>{`import { createPlanner } from './primitives/planner'

const planner = createPlanner({
  model: 'gpt-4',
  maxSteps: 5,
})

const plan = await planner.createPlan({
  goal: 'Research and summarize AI agent frameworks',
})`}</code>
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="check-setup" className="mb-3 text-2xl font-semibold">Check setup</h2>
          <InstallCommandBlock command="npx pixel-ui@latest doctor" />
        </div>
      </SectionFrame>
    </article>
  )
}

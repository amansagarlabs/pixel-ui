import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function ComponentsGuidePage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Core Concepts</p>
          <h1 id="components" className={PAGE_TITLE_CLASS}>
            Components
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Components are the visual building blocks for AI agent interfaces. They are framework-agnostic and copy-pasteable.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="overview" className="mb-3 text-2xl font-semibold">Overview</h2>
          <p className="text-muted-foreground">
            Unlike primitives which include full implementation logic, components are pure UI elements.
            They follow the shadcn/ui philosophy: copy the source, own the code, customize freely.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="component-types" className="mb-3 text-2xl font-semibold">Component Types</h2>
          <div className="space-y-3">
            {[
              { name: 'AI Elements', desc: 'Specialized UI components for AI interfaces: messages, reasoning chains, tool calls, artifacts.' },
              { name: 'Layout Components', desc: 'Structural elements: conversations, terminals, file trees.' },
              { name: 'Input Components', desc: 'User interaction: prompt inputs, attachments, suggestions.' },
              { name: 'Display Components', desc: 'Data presentation: sources, queues, checkpoints, shimmers.' },
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
          <h2 id="using-components" className="mb-3 text-2xl font-semibold">Using Components</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// Import a component directly
import { Message } from '@/components/ai-elements/message'
import { Reasoning } from '@/components/ai-elements/reasoning'

// Use in your JSX
<Message role="assistant" content="Hello!" />
<Reasoning steps={['Analyzing...', 'Planning...', 'Executing...']} />`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="browsing-components" className="mb-3 text-2xl font-semibold">Browsing Components</h2>
          <p className="text-muted-foreground">
            Visit the <a href="/components" className="text-foreground underline underline-offset-4 hover:no-underline">Components</a> page
            to browse all 60+ components with live previews, code snippets, and installation instructions.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/primitives">
            Previous: Primitives
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/schema">
            Next: Schema & Validation
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

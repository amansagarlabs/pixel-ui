import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function ConfigurationPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Configuration</p>
          <h1 id="configuration" className={PAGE_TITLE_CLASS}>Configuration</h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Customize pixel-ui for your project.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="config-file" className="mb-3 text-2xl font-semibold">Config file</h2>
          <p className="mb-3 text-muted-foreground">
            pixel-ui uses pixel-ui.json in your project root:
          </p>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">pixel-ui.json</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-code-foreground">
              <code>{`{
  "primitives": ["planner", "memory", "browser"],
  "style": "default",
  "typescript": true,
  "registry": "https://registry.pixel-ui.amansagar.in"
}`}</code>
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="options" className="mb-3 text-2xl font-semibold">Options</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background font-mono text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5">field</th>
                  <th className="px-3 py-2.5">type</th>
                  <th className="px-3 py-2.5">description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-3 py-2.5 font-mono text-xs">primitives</td>
                  <td className="px-3 py-2.5 text-muted-foreground">string[]</td>
                  <td className="px-3 py-2.5 text-muted-foreground">List of installed primitives</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2.5 font-mono text-xs">style</td>
                  <td className="px-3 py-2.5 text-muted-foreground">string</td>
                  <td className="px-3 py-2.5 text-muted-foreground">Coding style preference</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2.5 font-mono text-xs">typescript</td>
                  <td className="px-3 py-2.5 text-muted-foreground">boolean</td>
                  <td className="px-3 py-2.5 text-muted-foreground">Enable TypeScript support</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2.5 font-mono text-xs">registry</td>
                  <td className="px-3 py-2.5 text-muted-foreground">string</td>
                  <td className="px-3 py-2.5 text-muted-foreground">Registry URL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="framework-configuration" className="mb-3 text-2xl font-semibold">Framework configuration</h2>
          <p className="mb-3 text-muted-foreground">
            pixel-ui works with any TypeScript project.
          </p>

          <div className="space-y-3">
            {[
              {
                name: 'Next.js',
                desc: 'Primitives work in both Server and Client Components.',
                code: `import { createPlanner } from '@/primitives/planner'\n\nconst planner = createPlanner({ model: 'gpt-4' })`,
              },
              {
                name: 'LangGraph',
                desc: 'Integrate with LangGraph state machines.',
                code: `import { createPlanner } from './primitives/planner'\nimport { StateGraph } from '@langchain/langgraph'`,
              },
              {
                name: 'OpenAI Agents SDK',
                desc: "Use with OpenAI's Agents SDK.",
                code: `import { createPlanner } from './primitives/planner'\nimport { Agent } from 'openai/agents'`,
              },
            ].map((item) => (
              <div key={item.name} className="border border-border px-3 py-3 transition-colors hover:bg-secondary/30">
                <h3 className="font-mono text-sm font-medium text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-code p-2 font-mono text-xs leading-5 text-code-foreground">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </article>
  )
}

import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'
import { FrameworkCards } from '@/components/framework-cards'

export default function DocsPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs</p>
          <h1 id="introduction" className={PAGE_TITLE_CLASS}>
            Introduction
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Pixel UI is a shadcn-style primitive registry for AI agent interfaces &mdash; copy the source, own the runtime.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="py-4">
          <h2 id="quick-start" className="mb-3 text-2xl font-semibold">Quick Start</h2>
          <p className="max-w-[680px] text-muted-foreground">
            Install primitives as source. Each primitive carries UI, adapter logic, and a Zod schema.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[860px] py-4">
          <h2 id="supported-stack" className="mb-3 text-2xl font-semibold">Supported stack</h2>
          <FrameworkCards />
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="schema-rendering" className="mb-3 text-2xl font-semibold">Schema rendering</h2>
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
                {[
                  ['component', 'tsx', 'Agent-facing UI surface.'],
                  ['hook', 'ts', 'Runtime state and adapter helpers.'],
                  ['schema', 'zod', 'Input and output contract.'],
                ].map(row => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map(cell => (
                      <td key={cell} className="px-3 py-2.5 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div id="examples" className="max-w-[680px] py-4">
          <div className="border-l-2 border-foreground pl-4">
            <div className="font-mono text-xs uppercase text-foreground">Tip</div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Treat primitives as implementation patterns. Copy the files, own the runtime contract, and adapt the UI to
              your agent stack.
            </p>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/installation">
            Previous: Installation
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/cli">
            Next: CLI Reference
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

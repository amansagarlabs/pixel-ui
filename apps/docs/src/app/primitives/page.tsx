import Link from 'next/link'
import { SectionFrame } from '@/components/layout/page-frame'
import { InstallCommandBlock } from '@/components/install-command-block'

const primitives: Array<[string, string[]]> = [
  ['Reasoning', ['planner', 'evaluator', 'reflection']],
  ['Memory', ['memory', 'context']],
  ['I/O surfaces', ['attachments']],
  ['Tools', ['browser', 'tool-call-card', 'router', 'retry']],
  ['Guardrails', ['approval', 'security', 'telemetry']],
]

export default function PrimitivesPage() {
  return (
    <article className="space-y-12 py-12">
      <SectionFrame className="space-y-12">
        <div>
          <h1 className="mb-5 text-5xl font-semibold tracking-[-0.04em]">Components</h1>
          <p className="max-w-2xl leading-8 text-muted-foreground">
            Production-ready agent primitives grouped by the way teams actually search and install them.
          </p>
        </div>

        <div className="space-y-8">
          {primitives.map(([group, items]) => (
            <section key={group} className="space-y-3">
              <h2 className="font-mono text-xs uppercase text-muted-foreground">{group}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map(item => (
                  <Link
                    key={item}
                    href={`/primitives/${item}`}
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-[rgb(163,230,53)]/60"
                  >
                    <div className="font-mono text-xs text-muted-foreground">{group}</div>
                    <div className="mt-2 font-medium">{item}</div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <InstallCommandBlock command="npx pixel-ui@latest add <primitive-name>" />
      </SectionFrame>
    </article>
  )
}

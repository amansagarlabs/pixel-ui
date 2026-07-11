import { Terminal } from 'lucide-react'

export function CliSection() {
  return (
    <section id="cli" aria-labelledby="cli-title">
      <div className="border-b border-edge px-4 py-3 sm:px-6">
        <h2 id="cli-title" className="font-mono text-xs text-muted-foreground">
          One command, fully typed
        </h2>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Terminal panel */}
        <div className="border-b border-edge lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-1.5 border-b border-edge px-4 py-2.5 sm:px-6">
            <Terminal size={11} className="text-muted-foreground" aria-hidden="true" />
            <span className="font-mono text-[11px] text-muted-foreground">bash</span>
          </div>
          <div className="space-y-1.5 p-5 font-mono text-[13px] sm:px-6">
            <div className="flex items-center gap-2">
              <span className="select-none text-muted-foreground">$</span>
              <span className="text-foreground">npx pixel-ui add planner</span>
              <span
                className="inline-block h-4 w-0.5 animate-blink bg-foreground/70"
                aria-hidden="true"
              />
            </div>
            <div className="pl-5 text-xs text-muted-foreground">✓ Resolving primitive: planner</div>
            <div className="pl-5 text-xs text-muted-foreground">
              {'✓ Copying 3 files to '}
              <span className="text-foreground/80">primitives/planner/</span>
            </div>
            <div className="pl-5 text-xs text-lime">
              {'✓ Done! Import from '}
              <span className="text-foreground/80">@/primitives/planner</span>
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div>
          <div className="border-b border-edge px-4 py-2.5 sm:px-6">
            <span className="font-mono text-[11px] text-muted-foreground">result</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-muted-foreground sm:px-6">
{`primitives/planner/
├── `}<span className="text-foreground">planner.tsx</span>{'       '}<span className="text-muted-foreground/60">{'// UI Component'}</span>{`
├── `}<span className="text-foreground">use-planner.ts</span>{'    '}<span className="text-muted-foreground/60">{'// Logic Hook'}</span>{`
└── `}<span className="text-foreground">planner.schema.ts</span>{' '}<span className="text-muted-foreground/60">{'// Zod Schema'}</span>{`

`}<span className="text-lime">{'import'}</span>{` { Planner } `}<span className="text-lime">{'from'}</span>{` `}<span className="text-foreground/80">{'\'@/primitives/planner\''}</span>{`
`}<span className="text-lime">{'import'}</span>{` { usePlanner } `}<span className="text-lime">{'from'}</span>{`
  `}<span className="text-foreground/80">{'\'@/primitives/planner/use-planner\''}</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

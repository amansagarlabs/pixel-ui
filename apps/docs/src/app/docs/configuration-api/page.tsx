import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function ConfigurationApiPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / API Reference</p>
          <h1 id="configuration-api" className={PAGE_TITLE_CLASS}>
            Configuration API
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Complete reference for the pixel-ui.json configuration file and all available options.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="config-file" className="mb-3 text-2xl font-semibold">Configuration File</h2>
          <p className="text-muted-foreground">
            The <code className="rounded bg-code px-1.5 py-0.5 font-mono text-sm">pixel-ui.json</code> file
            is created when you run <code className="rounded bg-code px-1.5 py-0.5 font-mono text-sm">npx pixel-ui init</code>.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`{
  "$schema": "https://pixel.amansagar.in/schema.json",
  "registry": "https://registry.pixel-ui.amansagar.in",
  "adapter": "nextjs",
  "primitives": [
    "planner",
    "memory",
    "reflection"
  ],
  "components": [
    "message",
    "conversation",
    "reasoning"
  ],
  "options": {
    "typescript": true,
    "tailwind": true,
    "style": "default"
  }
}`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="options-reference" className="mb-3 text-2xl font-semibold">Options Reference</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background font-mono text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5">Option</th>
                  <th className="px-3 py-2.5">Type</th>
                  <th className="px-3 py-2.5">Default</th>
                  <th className="px-3 py-2.5">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['registry', 'string', 'required', 'Registry URL to fetch primitives from'],
                  ['adapter', 'string', '"nextjs"', 'Framework adapter to use'],
                  ['primitives', 'string[]', '[]', 'List of installed primitives'],
                  ['components', 'string[]', '[]', 'List of installed components'],
                  ['options.typescript', 'boolean', 'true', 'Generate TypeScript files'],
                  ['options.tailwind', 'boolean', 'true', 'Include Tailwind CSS classes'],
                  ['options.style', 'string', '"default"', 'UI style theme'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell) => (
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
        <div className="max-w-[680px] py-4">
          <h2 id="programmatic-config" className="mb-3 text-2xl font-semibold">Programmatic Configuration</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { ConfigManager } from '@pixel-ui/registry-sdk'

const config = new ConfigManager()

// Read config
const settings = config.get()

// Update config
config.set({
  adapter: 'nextjs',
  primitives: ['planner', 'memory'],
})

// Validate config
const isValid = config.validate()`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/registry-api">
            Previous: Registry API
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/contributing">
            Next: Contributing
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

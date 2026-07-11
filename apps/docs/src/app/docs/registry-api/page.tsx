import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function RegistryApiPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / API Reference</p>
          <h1 id="registry-api" className={PAGE_TITLE_CLASS}>
            Registry API
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Reference for the pixel-ui registry system and how to publish your own primitives.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="registry-structure" className="mb-3 text-2xl font-semibold">Registry Structure</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`{
  "name": "planner",
  "version": "1.0.0",
  "description": "Task planner primitive",
  "category": "reasoning",
  "files": [
    "index.ts",
    "planner.ts",
    "types.ts",
    "schema.ts",
    "prompt.md"
  ],
  "dependencies": ["zod"],
  "peerDependencies": ["react"]
}`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="publishing" className="mb-3 text-2xl font-semibold">Publishing Primitives</h2>
          <p className="text-muted-foreground">
            To publish your own primitive to a registry:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`# 1. Create your primitive directory
mkdir primitives/my-primitive

# 2. Add required files
# index.ts, my-primitive.ts, types.ts, schema.ts

# 3. Register in pixel-ui.json
{
  "registry": "https://your-registry.com",
  "primitives": ["my-primitive"]
}

# 4. Publish to your registry
npx pixel-ui publish my-primitive`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="registry-client" className="mb-3 text-2xl font-semibold">Registry Client</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`import { RegistryClient } from '@pixel-ui/registry-sdk'

const client = new RegistryClient({
  registry: 'https://registry.pixel-ui.amansagar.in',
})

// Fetch primitive metadata
const meta = await client.getPrimitive('planner')

// Download primitive files
const files = await client.downloadPrimitive('planner')

// Search primitives
const results = await client.search('memory', {
  category: 'memory',
  limit: 10,
})`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/sdk-api">
            Previous: SDK API
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/configuration-api">
            Next: Configuration API
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

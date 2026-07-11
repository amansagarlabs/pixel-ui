import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function CustomPrimitivesPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Guides</p>
          <h1 id="custom-primitives" className={PAGE_TITLE_CLASS}>
            Custom Primitives
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Create your own primitives to extend pixel-ui with domain-specific agent capabilities.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="primitive-structure" className="mb-3 text-2xl font-semibold">Primitive Structure</h2>
          <p className="text-muted-foreground">
            Every custom primitive follows the standard structure:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`primitives/my-primitive/
├── index.ts           # Public exports
├── my-primitive.ts    # Core implementation
├── types.ts           # TypeScript types
├── schema.ts          # Zod schemas
├── prompt.md          # System prompt (optional)
└── my-primitive.test.ts # Tests`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="creating-primitive" className="mb-3 text-2xl font-semibold">Creating a Primitive</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// schema.ts
import { z } from 'zod'

export const MyPrimitiveInputSchema = z.object({
  query: z.string().min(1),
  options: z.object({
    maxResults: z.number().default(10),
  }).optional(),
})

export type MyPrimitiveInput = z.infer<typeof MyPrimitiveInputSchema>

// my-primitive.ts
import { MyPrimitiveInputSchema } from './schema'

export function createMyPrimitive(config: Config) {
  return {
    async execute(input: MyPrimitiveInput) {
      const validated = MyPrimitiveInputSchema.parse(input)
      // Your implementation here
      return { results: [...] }
    },
  }
}`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="registering" className="mb-3 text-2xl font-semibold">Registering Your Primitive</h2>
          <p className="text-muted-foreground">
            Add your primitive to the registry configuration:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`// pixel-ui.json
{
  "registry": "https://your-registry.com",
  "primitives": [
    "planner",
    "memory",
    "my-primitive"
  ]
}`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/using-memory">
            Previous: Using Memory
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/testing">
            Next: Testing
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

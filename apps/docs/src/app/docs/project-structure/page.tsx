import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function ProjectStructurePage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Getting Started</p>
          <h1 id="project-structure" className={PAGE_TITLE_CLASS}>
            Project Structure
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Understand how pixel-ui organizes primitives, configurations, and source files in your project.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="overview" className="mb-3 text-2xl font-semibold">Overview</h2>
          <p className="text-muted-foreground">
            When you run <code className="rounded bg-code px-1.5 py-0.5 font-mono text-sm">npx pixel-ui init</code>,
            pixel-ui creates a structured layout in your project. This structure keeps primitives organized,
            version-controlled, and easy to maintain.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="directory-layout" className="mb-3 text-2xl font-semibold">Directory Layout</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`your-project/
├── pixel-ui.json          # Registry configuration
├── primitives/            # Installed primitives (source code)
│   ├── planner/
│   │   ├── index.ts       # Public exports
│   │   ├── planner.ts     # Core implementation
│   │   ├── types.ts       # TypeScript types
│   │   ├── schema.ts      # Zod schemas
│   │   └── prompt.md      # System prompt
│   ├── memory/
│   │   └── ...
│   └── reflection/
│       └── ...
├── src/
│   └── ...                # Your application code
└── package.json`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="key-files" className="mb-3 text-2xl font-semibold">Key Files</h2>
          <div className="space-y-3">
            {[
              { name: 'pixel-ui.json', desc: 'Configuration file that defines your registry URL, installed primitives, and project settings.' },
              { name: 'primitives/', desc: 'Directory containing all installed primitive source code. Each primitive has its own subdirectory.' },
              { name: 'index.ts', desc: 'Public API exports for each primitive. Import from this file in your application.' },
              { name: 'types.ts', desc: 'TypeScript type definitions for the primitive interface and options.' },
              { name: 'schema.ts', desc: 'Zod validation schemas for input/output contracts.' },
              { name: 'prompt.md', desc: 'System prompt templates used by AI-powered primitives.' },
            ].map((file) => (
              <div key={file.name} className="border border-border px-3 py-3">
                <h3 className="font-mono text-sm font-medium text-foreground">{file.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{file.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="adding-primitives" className="mb-3 text-2xl font-semibold">Adding Primitives</h2>
          <p className="mb-3 text-muted-foreground">
            When you add a primitive, pixel-ui downloads the source files into the <code className="rounded bg-code px-1.5 py-0.5 font-mono text-sm">primitives/</code> directory:
          </p>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`npx pixel-ui add planner

# Creates:
# primitives/planner/index.ts
# primitives/planner/planner.ts
# primitives/planner/types.ts
# primitives/planner/schema.ts
# primitives/planner/prompt.md`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/installation">
            Previous: Installation
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/configuration">
            Next: Configuration
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

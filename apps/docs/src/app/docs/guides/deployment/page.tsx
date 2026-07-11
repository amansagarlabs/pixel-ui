import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function DeploymentPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Guides</p>
          <h1 id="deployment" className={PAGE_TITLE_CLASS}>
            Deployment
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Deploy your pixel-ui-powered agent interfaces to production.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="build" className="mb-3 text-2xl font-semibold">Building for Production</h2>
          <p className="text-muted-foreground">
            pixel-ui primitives are source code, so they build with your application. No special build steps required.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`# Next.js
npm run build

# Vite
npm run build

# Your custom build command
# Primitives are included automatically`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="platforms" className="mb-3 text-2xl font-semibold">Supported Platforms</h2>
          <div className="space-y-3">
            {[
              { name: 'Vercel', desc: 'Zero-config deployment for Next.js and other frameworks.' },
              { name: 'Netlify', desc: 'Edge functions and serverless deployment.' },
              { name: 'Railway', desc: 'Full-stack deployment with databases.' },
              { name: 'Docker', desc: 'Containerized deployment for any environment.' },
              { name: 'Self-hosted', desc: 'Deploy to your own servers or VMs.' },
            ].map((platform) => (
              <div key={platform.name} className="border border-border px-3 py-3">
                <h3 className="text-sm font-medium text-foreground">{platform.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="environment-variables" className="mb-3 text-2xl font-semibold">Environment Variables</h2>
          <p className="text-muted-foreground">
            Configure your primitives with environment variables:
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`# Required
OPENAI_API_KEY=sk-...

# Optional
PIXEL_UI_REGISTRY=https://your-registry.com
PIXEL_UI_CACHE_DIR=.pixel-ui-cache
PIXEL_UI_LOG_LEVEL=info`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="performance" className="mb-3 text-2xl font-semibold">Performance Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Primitives are tree-shakeable - only import what you use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Use dynamic imports for heavy primitives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Enable caching for repeated API calls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Use edge functions for low-latency responses</span>
            </li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/guides/testing">
            Previous: Testing
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/cli">
            Next: CLI Commands
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

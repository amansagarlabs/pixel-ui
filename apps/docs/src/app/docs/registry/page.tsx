import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'
import { InstallCommandBlock } from '@/components/install-command-block'

const directInstall = 'npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/actions.json'
const namespaceInstall = `npx shadcn@latest registry add @pixel-ui=https://registry.pixel-ui.amansagar.in/r/{name}.json
npx shadcn@latest add @pixel-ui/actions`

export default function RegistryPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full max-w-[720px] space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Registry</p>
          <h1 id="registry" className={PAGE_TITLE_CLASS}>Registry</h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Run Pixel UI as a shadcn-compatible code registry for agentic UI components.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[720px] space-y-4 py-4">
          <h2 id="recommended-domains" className="text-2xl font-semibold">Recommended domains</h2>
          <p className="text-muted-foreground">
            Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">pixel.amansagar.in</code> for
            the product and docs site. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">registry.pixel-ui.amansagar.in</code> for
            machine-readable registry JSON.
          </p>
          <p className="text-muted-foreground">
            Keep <code className="rounded bg-muted px-1 py-0.5 text-foreground">www.amansagar.in/pixel-ui</code> as
            a portfolio or redirect URL, not the primary install endpoint.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[720px] space-y-4 py-4">
          <h2 id="direct-install" className="text-2xl font-semibold">Direct install</h2>
          <p className="text-muted-foreground">
            Every registry-ready component page maps to an item JSON file under <code className="rounded bg-muted px-1 py-0.5 text-foreground">/r</code>.
          </p>
          <InstallCommandBlock command={directInstall} className="mx-0" />
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[720px] space-y-4 py-4">
          <h2 id="namespace-install" className="text-2xl font-semibold">Namespace install</h2>
          <p className="text-muted-foreground">
            Teams can add Pixel UI once as a named registry, then install components by name.
          </p>
          <InstallCommandBlock command={namespaceInstall} className="mx-0" />
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[720px] space-y-4 py-4">
          <h2 id="endpoints" className="text-2xl font-semibold">Endpoints</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>- Catalog: <code className="rounded bg-muted px-1 py-0.5 text-foreground">https://registry.pixel-ui.amansagar.in/r/registry.json</code></li>
            <li>- Item: <code className="rounded bg-muted px-1 py-0.5 text-foreground">https://registry.pixel-ui.amansagar.in/r/actions.json</code></li>
            <li>- Product page: <code className="rounded bg-muted px-1 py-0.5 text-foreground">https://pixel.amansagar.in/components/actions</code></li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[720px] space-y-4 py-4">
          <h2 id="launch-set" className="text-2xl font-semibold">Launch set</h2>
          <p className="text-muted-foreground">
            Start with 26 agentic UI items: chat, message actions, prompt input, reasoning, task, queue, tools,
            code blocks, terminal, file tree, artifacts, sources, attachments, checkpoints, approvals, model
            selection, sandbox, and web preview.
          </p>
        </div>
      </SectionFrame>
    </article>
  )
}

import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'

export default function ContributingPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / Resources</p>
          <h1 id="contributing" className={PAGE_TITLE_CLASS}>
            Contributing
          </h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Help improve pixel-ui by contributing primitives, components, or documentation.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="ways-to-contribute" className="mb-3 text-2xl font-semibold">Ways to Contribute</h2>
          <div className="space-y-3">
            {[
              { name: 'Submit a Primitive', desc: 'Create new AI agent primitives following our schema guidelines.' },
              { name: 'Improve Components', desc: 'Enhance existing components with new features or bug fixes.' },
              { name: 'Write Documentation', desc: 'Help others understand pixel-ui with clear guides and examples.' },
              { name: 'Report Bugs', desc: 'Found an issue? Open a GitHub issue with reproduction steps.' },
              { name: 'Suggest Features', desc: 'Have an idea? Share it in GitHub Discussions.' },
            ].map((way) => (
              <div key={way.name} className="border border-border px-3 py-3">
                <h3 className="text-sm font-medium text-foreground">{way.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{way.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="development-setup" className="mb-3 text-2xl font-semibold">Development Setup</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-code">
            <pre className="p-4 font-mono text-sm leading-6 text-code-foreground">
{`# Fork and clone the repo
git clone https://github.com/your-username/pixel-ui.git
cd pixel-ui

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Lint code
npm run lint`}
            </pre>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="pr-guidelines" className="mb-3 text-2xl font-semibold">PR Guidelines</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Follow the existing code style and conventions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Include tests for new features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Update documentation for API changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Keep commits atomic and well-described</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Ensure all CI checks pass</span>
            </li>
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <a className="rounded-xl border border-border p-4 text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/configuration-api">
            Previous: Configuration API
          </a>
          <a className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground hover:text-foreground transition-colors" href="/docs/blog">
            Next: Blog
          </a>
        </div>
      </SectionFrame>
    </article>
  )
}

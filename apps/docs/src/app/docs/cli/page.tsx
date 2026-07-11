import {
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
  SectionFrame,
} from '@/components/layout/page-frame'
import { InstallCommandBlock } from '@/components/install-command-block'

export default function CLIPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-10 py-8 sm:py-10">
        <div className="w-full space-y-4">
          <p className="font-medium text-muted-foreground">Docs / CLI</p>
          <h1 id="cli-reference" className={PAGE_TITLE_CLASS}>CLI Reference</h1>
          <p className={PAGE_SUBHEAD_CLASS}>
            Command-line tools for managing AI agent primitives.
          </p>
        </div>

        <InstallCommandBlock
          command={`# Using npx (recommended)
npx pixel-ui <command>

# Or install globally
npm install -g pixel-ui`}
          className="w-full max-w-[620px]"
        />
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="commands" className="mb-3 text-2xl font-semibold">Commands</h2>
          <div className="space-y-3">
            {[
              {
                cmd: 'pixel-ui init',
                desc: 'Initialize a new pixel-ui project.',
                flags: ['--yes, -y          Skip prompts', '--template <name>  Use template'],
              },
              {
                cmd: 'pixel-ui add <primitive>',
                desc: 'Add a primitive to your project.',
                flags: ['--yes, -y            Skip prompts', '--registry <url>    Registry URL', '--force              Overwrite existing'],
              },
              {
                cmd: 'pixel-ui remove <primitive>',
                desc: 'Remove a primitive from your project.',
                flags: ['--yes, -y    Skip prompts'],
              },
              {
                cmd: 'pixel-ui list',
                desc: 'List installed primitives.',
                flags: ['--json      Output as JSON', '--verbose   Show details'],
              },
              {
                cmd: 'pixel-ui doctor',
                desc: 'Check your environment for issues.',
                flags: ['--fix    Auto-fix issues'],
              },
              {
                cmd: 'pixel-ui test [primitive]',
                desc: 'Run tests for installed primitives.',
                flags: ['--coverage    Show coverage', '--verbose     Verbose output'],
              },
              {
                cmd: 'pixel-ui upgrade [primitive]',
                desc: 'Upgrade installed primitives to latest versions.',
                flags: ['--registry <url>    Registry URL', '--all                Upgrade all primitives'],
              },
            ].map((item) => (
              <div key={item.cmd} className="border border-border px-3 py-3 transition-colors hover:bg-secondary/30">
                <h3 className="font-mono text-sm font-medium text-foreground">{item.cmd}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                <div className="mt-2 rounded-lg bg-code p-2 font-mono text-xs text-code-foreground">
                  {item.flags.map((flag) => (
                    <div key={flag} className="text-muted-foreground">{flag}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </article>
  )
}

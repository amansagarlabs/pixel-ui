import { InstallCommandBlock } from '@/components/install-command-block'
import {
  PAGE_COMMAND_BLOCK_CLASS,
  PAGE_SUBHEAD_CLASS,
  PAGE_TITLE_CLASS,
} from '@/components/layout/page-frame'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-headline">
      <div className="px-4 pb-10 pt-14 sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">Agent UI Primitives</p>
        <h1
          id="hero-headline"
          className={`${PAGE_TITLE_CLASS} mt-3`}
        >
          Pixel-perfect, uniquely crafted.
        </h1>
        <p className={`${PAGE_SUBHEAD_CLASS} mt-4`}>
          Copy-paste primitives for AI agent interfaces - tool calls, streaming chat, memory
          recall, approvals, and traces. Built with React, Tailwind CSS, and shadcn/ui.
        </p>
      </div>

      <div className="px-4 sm:px-6">
        <div className={PAGE_COMMAND_BLOCK_CLASS}>
          <InstallCommandBlock command="npx pixel-ui@latest add code-block-command" />
        </div>
      </div>
    </section>
  )
}

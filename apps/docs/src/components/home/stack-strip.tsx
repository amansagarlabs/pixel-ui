const STACK = ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'Zod', 'TypeScript']

export function StackStrip() {
  return (
    <section aria-label="Built with" className="border-b border-edge">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <span className="font-mono text-[11px] text-muted-foreground">Built with</span>
        {STACK.map((name) => (
          <span key={name} className="font-mono text-[11px] font-medium text-foreground/70">
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}

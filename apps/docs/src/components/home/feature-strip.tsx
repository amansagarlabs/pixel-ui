import { FileCode2, Layout, Unlock } from 'lucide-react'

const FEATURES = [
  {
    icon: Layout,
    label: 'Full Primitives',
    text: 'Not just UI — full primitives bundled with hooks, schemas, and type contracts for agent surfaces.',
  },
  {
    icon: Unlock,
    label: 'Own the Code',
    text: 'Copy the source directly into your project. No runtime dependency, no lock-in, no black box.',
  },
  {
    icon: FileCode2,
    label: 'Schema-Typed',
    text: 'Every primitive ships with a Zod schema for tool inputs, structured output, and UI props.',
  },
]

export function FeatureStrip() {
  return (
    <section id="blocks" aria-labelledby="features-title">
      <div className="border-b border-edge px-4 py-3 sm:px-6">
        <h2 id="features-title" className="font-mono text-xs text-muted-foreground">
          Why primitives, not components
        </h2>
      </div>
      <div className="grid md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, label, text }, i) => (
          <article
            key={label}
            className={`border-b border-edge p-6 md:border-b-0 ${
              i < FEATURES.length - 1 ? 'md:border-r' : ''
            }`}
          >
            <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-md border border-edge text-muted-foreground">
              <Icon size={14} aria-hidden="true" />
            </span>
            <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

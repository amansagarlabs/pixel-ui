const TESTIMONIALS = [
  {
    quote:
      'pixel-ui saved us weeks. The tool-call-card and guardrail primitives went straight into our approval flow — already typed, already composable.',
    name: 'Priya Nair',
    role: 'Staff Eng, Meridian AI',
    initials: 'PN',
  },
  {
    quote:
      'Finally a registry that ships the logic hook alongside the component. The Zod schemas alone are worth the install.',
    name: 'Marcus Webb',
    role: 'Founding Eng, Orbit Labs',
    initials: 'MW',
  },
  {
    quote:
      'We dropped the planner primitive into our multi-agent loop in 20 minutes. The trace-timeline is exactly what our ops team needed.',
    name: 'Soo-Jin Park',
    role: 'AI Platform Lead, Pulsar',
    initials: 'SP',
  },
]

export function TestimonialsRow() {
  return (
    <section aria-labelledby="testimonials-title">
      <div className="border-b border-edge px-4 py-3 sm:px-6">
        <h2 id="testimonials-title" className="font-mono text-xs text-muted-foreground">
          Trusted by agent builders
        </h2>
      </div>
      <div className="grid md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={`flex flex-col border-b border-edge p-6 md:border-b-0 ${
              i < TESTIMONIALS.length - 1 ? 'md:border-r' : ''
            }`}
          >
            <blockquote className="flex-1">
              <p className="text-[13px] leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-edge bg-secondary font-mono text-[11px] font-semibold text-foreground"
                aria-hidden="true"
              >
                {t.initials}
              </span>
              <div>
                <div className="text-[13px] font-medium text-foreground">{t.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

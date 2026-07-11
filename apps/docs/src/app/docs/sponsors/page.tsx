import Link from 'next/link'
import { Mail, Rocket, Sparkles } from 'lucide-react'

import { SectionFrame } from '@/components/layout/page-frame'

const sponsorTiers = [
  {
    name: 'Logo spot',
    price: 'Starter',
    detail: 'A focused placement in the sponsors row and docs footer for teams that want to support the registry early.',
  },
  {
    name: 'Featured support',
    price: 'Recommended',
    detail: 'A larger placement with a direct link to your product, plus priority visibility in sponsor surfaces.',
    featured: true,
  },
  {
    name: 'Launch partner',
    price: 'Partner',
    detail: 'For teams that want to support Pixel UI long-term and be listed first during launch.',
  },
]

const sponsorReasons = [
  'Keep new primitives documented and tested.',
  'Support a source-first agent UI library.',
  'Put your brand next to tools for AI-native product teams.',
]

export default function SponsorsPage() {
  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-12 py-14 sm:py-20">
        <div className="mx-auto max-w-[820px] space-y-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Sponsors
          </p>
          <h1 className="mx-auto max-w-[760px] text-[clamp(3rem,6.2vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-foreground">
            Support the agent UI registry.
          </h1>
          <p className="mx-auto max-w-[620px] text-[17px] leading-8 text-muted-foreground">
            Pixel UI is source-first infrastructure for agent interfaces. Sponsorship keeps the registry open, current, and polished for teams building AI-native products.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="mailto:pixel-ui@amansagar.in?subject=Pixel%20UI%20sponsorship"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Mail size={14} />
            Email Sponsorship
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Rocket size={14} />
            Read the Docs
          </Link>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid gap-3 py-4 sm:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className={`border bg-card p-5 ${
                tier.featured ? 'border-foreground shadow-[0_1px_0_rgba(0,0,0,0.08)]' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-foreground">{tier.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {tier.price}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.detail}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="grid gap-4 py-6 sm:grid-cols-[1fr_1.25fr]">
          <div className="border border-border bg-card p-5">
            <span className="flex size-9 items-center justify-center border border-border bg-background text-foreground">
              <Sparkles size={16} />
            </span>
            <h2 id="why-sponsor" className="mt-5 text-2xl font-semibold tracking-[-0.03em]">Why sponsor</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The registry is built for teams shipping real agent products, not demo-only UI.
            </p>
          </div>

          <div className="border border-border bg-card">
            {sponsorReasons.map((reason) => (
              <div key={reason} className="border-b border-border px-5 py-4 last:border-b-0">
                <p className="text-sm leading-6 text-muted-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame>
        <div className="max-w-[680px] py-4">
          <h2 id="contact" className="mb-3 text-2xl font-semibold tracking-[-0.03em]">Contact</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">Email</td>
                  <td className="px-3 py-2.5">
                    <a className="text-foreground underline underline-offset-4" href="mailto:pixel-ui@amansagar.in">
                      pixel-ui@amansagar.in
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">Subject</td>
                  <td className="px-3 py-2.5 text-muted-foreground">Pixel UI sponsorship</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">Response</td>
                  <td className="px-3 py-2.5 text-muted-foreground">We will follow up with placement and terms.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SectionFrame>
    </article>
  )
}

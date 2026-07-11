'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

import { FooterCredits } from '@/app/components/page'
import { SectionFrame } from '@/components/layout/page-frame'

type BlogPost = {
  title: string
  date: string
  summary: string
  tag: string
}

const posts: BlogPost[] = [
  {
    title: 'React Wheel Picker joins Vercel Open Source Program',
    date: '24.07.2025',
    summary: 'A small component becomes part of a larger open-source surface for product teams.',
    tag: 'Open source',
  },
  {
    title: 'Followed by @shadcn on X',
    date: '21.06.2025',
    summary: 'Notes on distribution, taste, and why public craft compounds over time.',
    tag: 'Signal',
  },
  {
    title: 'OrcDev discovered the wildest shadcn component libraries ever',
    date: '27.03.2026',
    summary: 'What agent UI libraries can learn from the most opinionated shadcn ecosystems.',
    tag: 'Components',
  },
  {
    title: 'OrcDev and Francesco Ciulla reviewed my open source portfolio',
    date: '04.01.2026',
    summary: 'Feedback from builders who care about presentation, clarity, and proof.',
    tag: 'Review',
  },
  {
    title: 'Tips for creating beautiful image borders',
    date: '13.09.2025',
    summary: 'Small visual details that make flat interfaces feel deliberate instead of plain.',
    tag: 'Design',
  },
  {
    title: "Two of my projects featured on OrcDev's YouTube channel",
    date: '06.09.2025',
    summary: 'A quick breakdown of what made the projects clear enough to share.',
    tag: 'Story',
  },
  {
    title: 'Manu Arora reviewed my portfolio website',
    date: '04.08.2025',
    summary: 'What a portfolio critique reveals about hierarchy and visual confidence.',
    tag: 'Review',
  },
  {
    title: 'Grateful for the feedback on my portfolio website',
    date: '14.07.2025',
    summary: 'How useful feedback turns a personal site into a clearer product surface.',
    tag: 'Notes',
  },
  {
    title: 'ChanhDai Brand',
    date: '11.05.2025',
    summary: 'A look at identity, monochrome restraint, and reusable interface patterns.',
    tag: 'Brand',
  },
  {
    title: 'Awesome Terminal - iTerm2 + Zsh + Oh My Zsh + Amazon Q',
    date: '02.03.2025',
    summary: 'A practical terminal setup for daily development work.',
    tag: 'Tools',
  },
  {
    title: 'Installing Uptime Kuma with Docker and setting up NGINX with SSL',
    date: '15.02.2025',
    summary: 'Deployment notes for monitoring, reverse proxies, and SSL.',
    tag: 'Ops',
  },
  {
    title: 'Welcome to chanhdai.com',
    date: '14.02.2025',
    summary: 'The first entry in a public archive of code, design, and product thinking.',
    tag: 'Intro',
  },
]

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-t border-border py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {post.tag}
          </div>
          <h2 className="mt-2 text-xl font-semibold leading-7 tracking-[-0.02em] text-foreground">
            {post.title}
          </h2>
          <p className="mt-2 max-w-[54ch] text-sm leading-6 text-muted-foreground">
            {post.summary}
          </p>
        </div>
        <time className="shrink-0 font-mono text-xs text-muted-foreground sm:pt-1">
          {post.date}
        </time>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [query, setQuery] = useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <article className="py-2 text-foreground">
      <SectionFrame className="space-y-12 py-14 sm:py-20">
        <div id="blog" className="space-y-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Blog
          </p>
          <h1 className="max-w-[760px] text-[clamp(3rem,6.2vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-foreground">
            Code, design, and agent UI notes.
          </h1>
          <p className="max-w-[620px] text-[17px] leading-8 text-muted-foreground">
            Notes on building UI systems, agent interfaces, open source work, and the little details that make products feel finished.
          </p>
        </div>

        <label className="relative block">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blog..."
            className="h-11 w-full rounded-md border border-border bg-background pl-9 pr-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 sm:text-sm"
          />
        </label>
      </SectionFrame>

      <SectionFrame>
        <div id="posts" className="py-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
            No posts match that search.
          </div>
        ) : null}
      </SectionFrame>

      <SectionFrame>
        <div className="grid max-w-[680px] gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <Link
            className="rounded-xl border border-border p-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/blocks"
          >
            Previous: Blocks
          </Link>
          <Link
            className="rounded-xl border border-border p-4 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/docs/sponsors"
          >
            Next: Sponsors
          </Link>
        </div>
      </SectionFrame>

      <div
        aria-hidden="true"
        className="mt-8 full-bleed-stripes h-8 border-y border-border/60 opacity-70"
      />
      <FooterCredits />
    </article>
  )
}

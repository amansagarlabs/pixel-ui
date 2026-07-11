import Link from 'next/link'

const frameworks = [
  {
    name: 'Next.js',
    description: 'React framework for production',
    href: 'https://nextjs.org',
  },
  {
    name: 'LangGraph',
    description: 'State machine framework for agents',
    href: 'https://langchain-ai.github.io/langgraph/',
  },
  {
    name: 'OpenAI SDK',
    description: 'OpenAI Agents SDK',
    href: 'https://github.com/openai/openai-node',
  },
  {
    name: 'Mastra',
    description: 'TypeScript agent framework',
    href: 'https://mastra.ai',
  },
  {
    name: 'CrewAI',
    description: 'Multi-agent orchestration',
    href: 'https://crewai.com',
  },
  {
    name: 'Vercel AI SDK',
    description: 'AI SDK for React/Next.js',
    href: 'https://sdk.vercel.ai',
  },
]

export function FrameworkCards() {
  return (
    <div className="mx-auto grid max-w-[860px] grid-cols-2 overflow-hidden rounded-2xl border border-border bg-background md:grid-cols-3">
      {frameworks.map((f) => (
        <a
          key={f.name}
          href={f.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-10 flex-col justify-center gap-0.5 border-r border-b border-border bg-card px-3 py-3 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none sm:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0"
        >
          <div className="text-sm font-medium text-foreground">{f.name}</div>
          <div className="text-[12px] leading-5 text-muted-foreground">{f.description}</div>
        </a>
      ))}
    </div>
  )
}

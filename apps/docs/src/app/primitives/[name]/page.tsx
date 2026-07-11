'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use, useState } from 'react'
import { SectionFrame } from '@/components/layout/page-frame'
import { Button } from '@/components/ui/button'
import {
  Attachment,
  AttachmentEmpty,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from '@/components/ai-elements/attachments'

const groups = [
  {
    title: 'Reasoning',
    items: ['planner', 'evaluator', 'reflection'],
  },
  {
    title: 'Memory',
    items: ['memory', 'context'],
  },
  {
    title: 'Tools',
    items: ['browser', 'tool-call-card', 'router', 'retry'],
  },
  {
    title: 'Guardrails',
    items: ['approval', 'security', 'telemetry'],
  },
  {
    title: 'Attachments',
    items: ['attachments'],
  },
]

const primitiveDetails = {
  planner: {
    name: 'planner',
    category: 'Reasoning',
    description: 'Task decomposition and execution state for agent workflows.',
    tags: ['planning', 'steps', 'runtime'],
    files: {
      'component.tsx': `export function PlannerPreview() {
  return <Planner steps={steps} status="running" />
}`,
      'schema.ts': `export const PlanStepSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed'])
})`,
      'hook.ts': `const planner = createPlanner({ maxSteps: 8 })`,
    },
    props: [
      ['goal', 'string', '-', 'User-visible goal being decomposed.'],
      ['steps', 'PlanStep[]', '[]', 'Ordered execution steps.'],
      ['status', 'PlanStatus', 'pending', 'Current planner state.'],
    ],
  },
  'tool-call-card': {
    name: 'tool-call-card',
    category: 'Tools',
    description: 'Auditable tool execution card for pending, running, success, error, and approval states.',
    tags: ['tools', 'trace', 'approval'],
    files: {
      'component.tsx': `export function ToolCallCard(props: ToolCallCardProps) {
  return <section>{props.toolName}</section>
}`,
      'schema.ts': `export const ToolCallCardPropsSchema = z.object({
  id: z.string(),
  toolName: z.string(),
  status: z.enum(['pending', 'running', 'success', 'error'])
})`,
      'hook.ts': `const state = createToolCallState(props)`,
    },
    props: [
      ['id', 'string', '-', 'Stable tool call identifier.'],
      ['toolName', 'string', '-', 'Runtime tool or function name.'],
      ['status', 'pending | running | success | error', 'pending', 'Execution state.'],
      ['requiresApproval', 'boolean', 'false', 'Shows approve and reject actions.'],
    ],
  },
  memory: {
    name: 'memory',
    category: 'Memory',
    description: 'Short-term and long-term memory surfaces for agent context.',
    tags: ['memory', 'recall', 'context'],
    files: {
      'component.tsx': `export function MemoryRecallCard() {
  return <MemoryRecall entries={entries} />
}`,
      'schema.ts': `export const MemoryEntrySchema = z.object({
  role: z.string(),
  content: z.string()
})`,
      'hook.ts': `await memory.add('user', message)`,
    },
    props: [
      ['entries', 'MemoryEntry[]', '[]', 'Recall results or conversation buffer.'],
      ['maxTokens', 'number', '4000', 'Token budget for memory.'],
      ['strategy', 'string', 'recent', 'Recall strategy.'],
    ],
  },
  attachments: {
    name: 'attachments',
    category: 'I/O surfaces',
    description: 'Composable attachment surfaces for files, images, audio, video, and source documents.',
    tags: ['files', 'media', 'hover preview'],
    files: {
      'component.tsx': `export function Attachments() {
  return (
    <Attachments variant="grid">
      <Attachment data={file}>
        <AttachmentPreview />
        <AttachmentInfo />
        <AttachmentRemove />
      </Attachment>
    </Attachments>
  )
}`,
      'schema.ts': `export const AttachmentDataSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional()
})`,
      'hook.ts': `const attachments = useAttachments(message.parts)`,
    },
    props: [
      ['variant', '"grid" | "inline" | "list"', 'grid', 'Layout style.'],
      ['data', 'AttachmentData', '-', 'File or source document payload.'],
      ['onRemove', '() => void', '-', 'Remove callback for the item.'],
    ],
  },
}

const fallback = {
  name: 'primitive',
  category: 'Runtime',
  description: 'Agent primitive with source, logic, and schema.',
  tags: ['agent', 'schema'],
  files: {
    'component.tsx': `export function Primitive() {
  return null
}`,
    'schema.ts': `export const PrimitiveSchema = z.object({})`,
    'hook.ts': `export function usePrimitive() {}`,
  },
  props: [['name', 'string', '-', 'Primitive name.']],
}

function PrimitivePreview({ name, viewport, theme }: { name: string; viewport: string; theme: string }) {
  const width = viewport === 'mobile' ? 'max-w-xs' : viewport === 'tablet' ? 'max-w-md' : 'max-w-2xl'

  return (
    <div className={`mx-auto ${width}`}>
      <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-border bg-card' : 'border-zinc-200 bg-white text-black'}`}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <div className="font-mono text-xs text-muted-foreground">{name}</div>
            <div className="mt-1 text-sm font-medium">
              {name === 'tool-call-card' ? 'browser.navigate' : 'agent execution'}
            </div>
          </div>
          <span className="rounded-full bg-[rgb(163,230,53)]/10 px-2 py-1 font-mono text-xs text-[rgb(163,230,53)]">
            running
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {['validate schema', 'run adapter', 'emit state'].map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
              <span>{item}</span>
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PrimitivePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params)
  const primitive = primitiveDetails[name as keyof typeof primitiveDetails] ?? (groups.some(group => group.items.includes(name)) ? fallback : null)
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [file, setFile] = useState('component.tsx')
  const [viewport, setViewport] = useState('desktop')
  const [theme, setTheme] = useState('dark')
  const [attachmentVariant, setAttachmentVariant] = useState<'grid' | 'inline' | 'list'>('grid')
  const sampleAttachments = [
    { id: '1', type: 'file' as const, filename: 'mountain-landscape.jpg', mediaType: 'image/jpeg', url: '', size: '2.4 MB' },
    { id: '2', type: 'file' as const, filename: 'ocean-sunset.jpg', mediaType: 'image/jpeg', url: '', size: '1.8 MB' },
    { id: '3', type: 'file' as const, filename: 'meeting-recording.mp3', mediaType: 'audio/mpeg', url: '', size: '14.2 MB' },
    { id: '4', type: 'file' as const, filename: 'quarterly-report-2024.pdf', mediaType: 'application/pdf', url: '', size: '820 KB' },
  ]

  if (!primitive) {
    notFound()
  }

  const activeFile = primitive.files[file as keyof typeof primitive.files] ?? Object.values(primitive.files)[0]

  return (
      <main className="min-w-0 overflow-x-hidden py-2">
        <SectionFrame className="space-y-10">
        <section>
          <div className="font-mono text-xs text-muted-foreground">
            Components / {primitive.category} / {primitive.name}
          </div>
          <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-4xl font-semibold">{primitive.name}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{primitive.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
                  {primitive.category}
                </span>
                {primitive.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(['preview', 'code'] as const).map(item => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-md px-3 py-2 text-sm ${tab === item ? 'bg-[rgb(163,230,53)] text-black' : 'border border-border text-muted-foreground'}`}
                  type="button"
                >
                  {item === 'preview' ? 'Preview' : 'Code'}
                </button>
              ))}
              <Button className="h-10 rounded-md">Copy</Button>
              <span className="max-w-full break-all rounded-full border border-border px-3 py-2 font-mono text-xs text-muted-foreground">
                npx pixel-ui add {primitive.name}
              </span>
            </div>
          </div>
        </section>

        {tab === 'preview' ? (
          <section className="space-y-6">
            <div className="rounded-lg border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="flex gap-2">
                  {['mobile', 'tablet', 'desktop'].map(item => (
                    <button
                      key={item}
                      onClick={() => setViewport(item)}
                      className={`rounded-md px-3 py-1.5 font-mono text-xs ${viewport === item ? 'bg-[rgb(163,230,53)] text-black' : 'border border-border text-muted-foreground'}`}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground"
                    type="button"
                  >
                    {theme}
                  </button>
                  <Link href="/playground" className="font-mono text-xs text-muted-foreground hover:text-foreground">
                    open in playground
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[length:18px_18px] p-6">
                {primitive.name === 'attachments' ? (
                  <div className={`mx-auto min-w-0 ${viewport === 'mobile' ? 'max-w-sm' : viewport === 'tablet' ? 'max-w-2xl' : 'max-w-5xl'}`}>
                    <div className="mb-3 flex items-center gap-2">
                      {(['grid', 'inline', 'list'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setAttachmentVariant(mode)}
                          className={`rounded-md px-3 py-1.5 font-mono text-xs capitalize ${
                            attachmentVariant === mode ? 'bg-[rgb(163,230,53)] text-black' : 'border border-border text-muted-foreground'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>

                    {attachmentVariant === 'grid' ? (
                      <Attachments variant="grid" className="grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {sampleAttachments.map((file) => (
                          <Attachment key={file.id} data={file} className="bg-background/95" onRemove={() => undefined}>
                            <div className="space-y-3">
                              <AttachmentPreview className="aspect-[4/3] bg-background/60" />
                              <AttachmentInfo className="pt-0">
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-medium">{file.filename}</div>
                                  <div className="font-mono text-[11px] text-muted-foreground">{file.mediaType}</div>
                                </div>
                              </AttachmentInfo>
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-[11px] text-muted-foreground">{file.size}</span>
                                <AttachmentRemove label="Remove" />
                              </div>
                            </div>
                          </Attachment>
                        ))}
                      </Attachments>
                    ) : null}

                    {attachmentVariant === 'inline' ? (
                      <Attachments variant="inline" className="items-start">
                        {sampleAttachments.slice(0, 3).map((file) => (
                          <Attachment key={file.id} data={file} className="min-w-[220px] bg-background/95" onRemove={() => undefined}>
                            <div className="flex items-center gap-2">
                              <div className="relative size-8 rounded-md border border-border/70 bg-background/90">
                                <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-sky-500" />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium">{file.filename}</div>
                                <div className="font-mono text-[10px] text-muted-foreground">{file.mediaType}</div>
                              </div>
                            </div>
                          </Attachment>
                        ))}
                      </Attachments>
                    ) : null}

                    {attachmentVariant === 'list' ? (
                      <Attachments variant="list">
                        {sampleAttachments.map((file) => (
                          <Attachment key={file.id} data={file} className="bg-background/95" onRemove={() => undefined}>
                            <div className="flex items-center gap-3">
                              <AttachmentPreview className="aspect-square h-10 w-10 shrink-0 bg-background/60" />
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium">{file.filename}</div>
                                <div className="font-mono text-[11px] text-muted-foreground">{file.mediaType}</div>
                              </div>
                              <div className="font-mono text-[11px] text-muted-foreground">{file.size}</div>
                              <AttachmentRemove label="Remove" />
                            </div>
                          </Attachment>
                        ))}
                      </Attachments>
                    ) : null}

                    <div className="mt-3 max-w-sm">
                      <AttachmentEmpty />
                    </div>
                  </div>
                ) : (
                  <PrimitivePreview name={primitive.name} viewport={viewport} theme={theme} />
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Props and schema</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-card font-mono text-xs text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">prop</th>
                      <th className="px-4 py-3">type</th>
                      <th className="px-4 py-3">default</th>
                      <th className="px-4 py-3">description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {primitive.props.map(row => (
                      <tr key={row[0]} className="border-t border-border">
                        {row.map(cell => (
                          <td key={cell} className="px-4 py-3 text-muted-foreground">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex gap-2">
                {Object.keys(primitive.files).map(item => (
                  <button
                    key={item}
                    onClick={() => setFile(item)}
                    className={`rounded-md px-3 py-1.5 font-mono text-xs ${file === item ? 'bg-[rgb(163,230,53)] text-black' : 'text-muted-foreground'}`}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <Button className="h-9 rounded-md">Copy file</Button>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-muted-foreground">{activeFile}</pre>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3 text-xl font-semibold">Usage</div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-muted-foreground">{`import { ${primitive.name === 'tool-call-card' ? 'ToolCallCard' : 'createPlanner'} } from './${primitive.name}'`}</pre>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Related primitives</h2>
            <div className="mt-4 space-y-2">
              {['planner', 'tool-call-card', 'memory'].filter(item => item !== primitive.name).map(item => (
                <Link key={item} href={`/primitives/${item}`} className="block rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>
        </SectionFrame>
      </main>
  )
}

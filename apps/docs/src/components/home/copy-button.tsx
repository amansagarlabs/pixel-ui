'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  value: string
  label?: string
  compact?: boolean
}

export function CopyButton({ value, label = 'Copy', compact = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : `Copy ${label}`}
        className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check size={11} className="text-lime" />
        ) : (
          <Copy size={11} />
        )}
        <span>{copied ? 'copied' : label}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy ${label}`}
      className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
    >
      {copied ? (
        <Check size={12} className="text-lime" />
      ) : (
        <Copy size={12} />
      )}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  )
}

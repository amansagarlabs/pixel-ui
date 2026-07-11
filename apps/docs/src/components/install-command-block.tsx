"use client"

import { useMemo } from 'react'

import { CodeBlockCommand, convertNpmCommand } from '@/components/code-block-command'
import { cn } from '@/lib/utils'

type InstallCommandBlockProps = {
  command: string
  className?: string
  onCopySuccess?: (data: { packageManager: "pnpm" | "yarn" | "npm" | "bun"; command: string }) => void
}

function convertCommandBlock(command: string) {
  const lines = command.split(/\r?\n/)

  const perManager = {
    pnpm: [] as string[],
    yarn: [] as string[],
    npm: [] as string[],
    bun: [] as string[],
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      for (const key of Object.keys(perManager) as Array<keyof typeof perManager>) {
        perManager[key].push('')
      }
      continue
    }

    if (trimmed.startsWith('#')) {
      for (const key of Object.keys(perManager) as Array<keyof typeof perManager>) {
        perManager[key].push(line)
      }
      continue
    }

    const indentation = line.match(/^\s*/)?.[0] ?? ''
    const shellLine = trimmed.startsWith('$') ? trimmed.replace(/^\$\s*/, '') : trimmed
    const converted = convertNpmCommand(shellLine)

    perManager.pnpm.push(`${indentation}${converted.pnpm}`)
    perManager.yarn.push(`${indentation}${converted.yarn}`)
    perManager.npm.push(`${indentation}${converted.npm}`)
    perManager.bun.push(`${indentation}${converted.bun}`)
  }

  return {
    pnpm: perManager.pnpm.join('\n'),
    yarn: perManager.yarn.join('\n'),
    npm: perManager.npm.join('\n'),
    bun: perManager.bun.join('\n'),
  }
}

export function InstallCommandBlock({ command, className, onCopySuccess }: InstallCommandBlockProps) {
  const commands = useMemo(() => convertCommandBlock(command), [command])

  return (
    <div className={cn('mx-auto w-full max-w-[620px]', className)}>
      <CodeBlockCommand
        {...commands}
        onCopySuccess={onCopySuccess}
      />
    </div>
  )
}

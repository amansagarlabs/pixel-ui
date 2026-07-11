type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean>
  | ((...args: never[]) => unknown)

function flatten(values: ClassValue[]): string[] {
  const output: string[] = []

  for (const value of values) {
    if (!value) {
      continue
    }

    if (typeof value === 'string' || typeof value === 'number') {
      output.push(String(value))
      continue
    }

    if (Array.isArray(value)) {
      output.push(...flatten(value))
      continue
    }

    if (typeof value === 'function') {
      const resolved = value()
      if (typeof resolved === 'string' || typeof resolved === 'number') {
        output.push(String(resolved))
      }
      continue
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) {
        output.push(key)
      }
    }
  }

  return output
}

export function cn(...values: ClassValue[]) {
  return flatten(values).join(' ')
}

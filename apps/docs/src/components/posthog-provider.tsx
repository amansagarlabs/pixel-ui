'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureEvent, initAnalytics } from '@/lib/analytics'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (initialized.current) return

    if (!initAnalytics()) return
    initialized.current = true
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const query = searchParams?.toString()
    captureEvent('$pageview', {
      $current_url: query ? `${pathname}?${query}` : pathname,
    })
  }, [ready, pathname, searchParams])

  return children
}

'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { captureEvent, initAnalytics } from '@/lib/analytics'

export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <PostHogTracking>{children}</PostHogTracking>
    </Suspense>
  )
}

function PostHogTracking({ children }: { children: ReactNode }) {
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

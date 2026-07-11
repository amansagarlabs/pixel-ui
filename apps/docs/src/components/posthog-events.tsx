'use client'

import { useEffect } from 'react'
import { captureEvent } from '@/lib/analytics'

export function ComponentViewedEvent({
  component,
  category,
}: {
  component: string
  category: string
}) {
  useEffect(() => {
    captureEvent('component_viewed', {
      component,
      category,
    })
  }, [component, category])

  return null
}

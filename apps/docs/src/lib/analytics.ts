'use client'

import posthog from 'posthog-js'

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>

export function initAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return false

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    respect_dnt: true,
    mask_all_text: false,
  })

  return true
}

export function captureEvent(name: string, properties?: AnalyticsProps) {
  posthog.capture(name, properties)
}

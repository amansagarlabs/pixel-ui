'use client'

import { useEffect, useRef, useState } from 'react'

export function ScrollProgress({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateProgress = () => {
      if (!container) return
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    container.addEventListener('scroll', updateProgress, { passive: true })
    return () => container.removeEventListener('scroll', updateProgress)
  }, [containerRef])

  return (
    <div className="fixed left-0 top-14 w-1 h-[calc(100vh-56px)] z-50 pointer-events-none">
      <div
        className="w-full bg-gradient-to-b from-cyan-500 to-blue-500 transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}
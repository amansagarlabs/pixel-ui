'use client'

export function BrandMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="4" width="4" height="20" />
      <rect x="8" y="4" width="12" height="4" />
      <rect x="20" y="8" width="4" height="8" />
      <rect x="8" y="16" width="12" height="4" />
      <rect x="8" y="8" width="4" height="8" fill="transparent" />
    </svg>
  )
}

export function BrandBadge({
  className = '',
  markClassName = 'size-7 text-background',
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-md border border-border bg-foreground shadow-[0_8px_30px_rgba(0,0,0,0.18)] ${className}`}
    >
      <BrandMark className={markClassName} />
    </div>
  )
}

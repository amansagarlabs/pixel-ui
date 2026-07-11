"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { ContrastIcon } from "@/components/icons/cil-contrast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!isMounted) {
    return <div className="h-10 w-10" />
  }

  const isDark = theme === "dark"
  const nextTheme = isDark ? "light" : "dark"

  return (
    <TooltipProvider delayDuration={180} skipDelayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={`Switch to ${nextTheme} theme`}
          >
            <ContrastIcon className="size-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Switch to {nextTheme} theme
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ThemeSwitcher }

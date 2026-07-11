'use client'

import { usePathname } from 'next/navigation'
import {
  MacOSSidebar,
  docsMacSidebarSections,
  defaultMacSidebarSections,
  docsNavSections,
} from '@/components/ui/macos-sidebar'

export function Sidebar() {
  const pathname = usePathname()
  const isDocsPage = pathname.startsWith('/docs')
  const sections = isDocsPage ? docsMacSidebarSections : defaultMacSidebarSections
  const navSections = isDocsPage ? docsNavSections : undefined

  return (
    <MacOSSidebar
      pathname={pathname}
      sections={sections}
      navSections={navSections}
      className="h-full"
    />
  )
}

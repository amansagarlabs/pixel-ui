import { DocsLayout } from '@/components/layout/docs-layout'

export default function RoadmapLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DocsLayout>{children}</DocsLayout>
}

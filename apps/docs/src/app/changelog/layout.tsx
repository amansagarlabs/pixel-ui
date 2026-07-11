import { DocsLayout } from '@/components/layout/docs-layout'

export default function ChangelogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DocsLayout>{children}</DocsLayout>
}

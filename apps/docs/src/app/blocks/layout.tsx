import { PageShell } from '@/components/layout/page-frame'

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return <PageShell centerWidth={960}>{children}</PageShell>
}

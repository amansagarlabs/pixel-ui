import { notFound } from 'next/navigation'
import { ComponentDetailPage } from '@/components/component-detail-page'
import { ComponentViewedEvent } from '@/components/posthog-events'
import { FooterCredits } from '../page'
import { componentSlugs } from '../data'
import { componentDetails, getFallbackComponentDetail } from '../detail-data'
import { componentRegistry } from '@/lib/component-registry'

export function generateStaticParams() {
  return componentSlugs.map(slug => ({ slug }))
}

export default async function ComponentAliasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!componentSlugs.includes(slug)) {
    notFound()
  }

  const detail = componentDetails[slug] ?? getFallbackComponentDetail(slug)
  const category = componentRegistry.find((item) => item.slug === slug)?.category ?? 'pixel'

  return (
    <>
      <ComponentViewedEvent component={slug} category={category} />
      <ComponentDetailPage {...detail} />
      <FooterCredits />
    </>
  )
}

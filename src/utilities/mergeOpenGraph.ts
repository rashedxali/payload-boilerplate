import type { Metadata } from 'next'

import type { SeoDefaults } from './getSeoDefaults'
import { getServerSideURL } from './getURL'

export const createDefaultOpenGraph = (defaults?: SeoDefaults): Metadata['openGraph'] => ({
  type: 'website',
  description: defaults?.defaultDescription || 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: defaults?.defaultOgImageUrl || `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: defaults?.siteName || 'Payload Website Template',
  title: defaults?.siteName || 'Payload Website Template',
})

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  defaults?: SeoDefaults,
): Metadata['openGraph'] => {
  const defaultOpenGraph = createDefaultOpenGraph(defaults) ?? {}

  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

import type { Metadata } from 'next'

import type { SeoDefaults } from './getSeoDefaults'

export const createDefaultOpenGraph = (defaults?: SeoDefaults): Metadata['openGraph'] => ({
  type: 'website',
  description: defaults?.defaultDescription,
  images: defaults?.defaultOgImageUrl ? [{ url: defaults.defaultOgImageUrl }] : undefined,
  siteName: defaults?.siteName || undefined,
  title: defaults?.siteName || undefined,
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

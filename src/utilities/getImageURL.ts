import type { Media } from '@/payload-types'

import { getServerSideURL } from './getURL'

export const getImageURL = (
  image?: Media | number | null,
  fallback = '/website-template-OG.webp',
) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return serverUrl + fallback
}

import type { Media } from '@/payload-types'

import { getServerSideURL } from './getURL'

/** Absolute URL of a populated media document, or undefined when there is no image. */
export const getImageURL = (image?: Media | number | null): string | undefined => {
  if (image && typeof image === 'object' && 'url' in image && image.url) {
    const ogUrl = image.sizes?.og?.url

    return getServerSideURL() + (ogUrl || image.url)
  }

  return undefined
}

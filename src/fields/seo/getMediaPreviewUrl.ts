import type { Media } from '@/payload-types'

export function getMediaPreviewUrl(
  image: Media | number | string | null | undefined,
  serverURL: string,
): string | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  const relativeUrl = image.sizes?.og?.url || image.thumbnailURL || image.url

  if (!relativeUrl) {
    return null
  }

  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl
  }

  return `${serverURL}${relativeUrl}`
}

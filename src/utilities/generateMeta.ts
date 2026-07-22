import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { getDocumentURL } from './getDocumentURL'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type SeoDoc = Partial<Page> | Partial<Post> | null

export const generateMeta = async (args: {
  collection?: 'pages' | 'posts'
  doc: SeoDoc
}): Promise<Metadata> => {
  const { collection = 'pages', doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const pageTitle = doc?.meta?.title || doc?.title
  const title = pageTitle ? `${pageTitle} | Payload Website Template` : 'Payload Website Template'
  const canonicalURL =
    doc?.meta?.canonicalURL || getDocumentURL(typeof doc?.slug === 'string' ? doc.slug : null, collection)
  const isNoIndex = doc?.meta?.robots === 'noindex'

  return {
    alternates: {
      canonical: canonicalURL,
    },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalURL,
    }),
    robots: isNoIndex
      ? {
          follow: true,
          index: false,
        }
      : {
          follow: true,
          index: true,
        },
    title,
  }
}

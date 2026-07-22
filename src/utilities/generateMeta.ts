import type { Metadata } from 'next'

import type { Page, Post } from '../payload-types'

import { getDocumentURL } from './getDocumentURL'
import { getImageURL } from './getImageURL'
import { mergeOpenGraph } from './mergeOpenGraph'
import { resolveOpenGraphMeta, resolveTwitterMeta } from './resolveSocialMeta'

type SeoDoc = Partial<Page> | Partial<Post> | null

export const generateMeta = async (args: {
  collection?: 'pages' | 'posts'
  doc: SeoDoc
}): Promise<Metadata> => {
  const { collection = 'pages', doc } = args

  const openGraph = resolveOpenGraphMeta(doc)
  const twitter = resolveTwitterMeta(doc)
  const ogImage = getImageURL(openGraph.image)
  const twitterImage = getImageURL(twitter.image)

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
      description: openGraph.description || doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: openGraph.title || title,
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
    twitter: {
      card: 'summary_large_image',
      description: twitter.description || openGraph.description || doc?.meta?.description || '',
      images: twitterImage ? [twitterImage] : undefined,
      title: twitter.title || openGraph.title || title,
    },
  }
}

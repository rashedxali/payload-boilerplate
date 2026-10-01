import type { Where } from 'payload'

import type { DocumentCollection } from '@/utilities/getDocumentURL'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedSettings } from '@/utilities/getSettings'
import { isSitemapEnabled } from '@/utilities/buildRobotsTxt'

/** Collections with SEO plugin `meta.robots` — used to filter noindex docs from sitemaps. */
export const sitemapSeoCollections = ['pages', 'blogs'] as const satisfies readonly DocumentCollection[]

export type SitemapSeoCollection = (typeof sitemapSeoCollections)[number]

export function collectionHasSitemapSeoMeta(
  collection: DocumentCollection,
): collection is SitemapSeoCollection {
  return (sitemapSeoCollections as readonly DocumentCollection[]).includes(collection)
}

export async function getSitemapSettingsResponse(): Promise<Response | null> {
  const settings = await getCachedSettings()

  if (!isSitemapEnabled(settings)) {
    return new Response('Not Found', { status: 404 })
  }

  return null
}

export function getSiteURL(): string {
  return getServerSideURL()
}

export const indexableRobotsWhere: Where = {
  or: [
    {
      'meta.robots': {
        not_equals: 'noindex',
      },
    },
    {
      'meta.robots': {
        exists: false,
      },
    },
  ],
}

export function getSitemapDocumentWhere(collection: DocumentCollection): Where {
  const publishedWhere: Where = {
    _status: {
      equals: 'published',
    },
  }

  if (!collectionHasSitemapSeoMeta(collection)) {
    return publishedWhere
  }

  return {
    and: [publishedWhere, indexableRobotsWhere],
  }
}

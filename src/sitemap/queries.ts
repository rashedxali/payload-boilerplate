import config from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import {
  getSitemapCacheTag,
  type SitemapCollectionResource,
} from '@/sitemap/registry'
import { getSiteURL, collectionHasSitemapSeoMeta, getSitemapDocumentWhere } from '@/sitemap/shared'
import {
  getCollectionPath,
  getDocumentPath,
  type DocumentCollection,
} from '@/utilities/getDocumentURL'
import { redirectedPageSlugs } from '../../redirects'

type SitemapEntry = {
  loc: string
  lastmod: string
}

const redirectedPageSlugSet = new Set<string>(redirectedPageSlugs)

function getExtraSitemapEntries(
  collection: DocumentCollection,
  siteURL: string,
  dateFallback: string,
): SitemapEntry[] {
  if (collection === 'pages') {
    return [
      {
        loc: `${siteURL}/search`,
        lastmod: dateFallback,
      },
    ]
  }

  const archivePath = getCollectionPath(collection)

  if (archivePath === '/') {
    return []
  }

  return [
    {
      loc: `${siteURL}${archivePath}`,
      lastmod: dateFallback,
    },
  ]
}

function dedupeSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>()

  return entries.filter((entry) => {
    if (seen.has(entry.loc)) return false
    seen.add(entry.loc)
    return true
  })
}

function sortSitemapEntries(collection: DocumentCollection, entries: SitemapEntry[]): SitemapEntry[] {
  if (collection !== 'pages') {
    return entries
  }

  const siteURL = getSiteURL()
  const homepageUrl = `${siteURL}/`

  return [...entries].sort((a, b) => {
    if (a.loc === homepageUrl) return -1
    if (b.loc === homepageUrl) return 1
    return a.loc.localeCompare(b.loc)
  })
}

async function fetchCollectionSitemapEntries(
  collection: DocumentCollection,
): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config })
  const siteURL = getSiteURL()
  const dateFallback = new Date().toISOString()

  const results = await payload.find({
    collection,
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: getSitemapDocumentWhere(collection),
    select: collectionHasSitemapSeoMeta(collection)
      ? {
          slug: true,
          updatedAt: true,
          meta: {
            robots: true,
          },
        }
      : {
          slug: true,
          updatedAt: true,
        },
  })

  const documentEntries = results.docs
    ? results.docs
        .filter((doc) => {
          if (!doc?.slug) return false

          if (collection === 'pages' && redirectedPageSlugSet.has(doc.slug)) {
            return false
          }

          const robots = 'meta' in doc ? doc.meta?.robots : undefined
          return robots !== 'noindex'
        })
        .map((doc) => ({
          loc: `${siteURL}${getDocumentPath(doc.slug, collection)}`,
          lastmod: doc.updatedAt || dateFallback,
        }))
    : []

  const entries = dedupeSitemapEntries([
    ...getExtraSitemapEntries(collection, siteURL, dateFallback),
    ...documentEntries,
  ])

  return sortSitemapEntries(collection, entries)
}

export function getCollectionSitemapEntries(resource: SitemapCollectionResource) {
  const { collection } = resource
  const cacheTag = getSitemapCacheTag(collection)

  return unstable_cache(
    () => fetchCollectionSitemapEntries(collection),
    [cacheTag],
    {
      tags: [cacheTag],
    },
  )()
}

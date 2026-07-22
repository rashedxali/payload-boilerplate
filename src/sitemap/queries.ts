import config from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { getSiteURL, indexableRobotsWhere } from '@/sitemap/shared'

export const getPagesSitemapEntries = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteURL = getSiteURL()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          indexableRobotsWhere,
        ],
      },
      select: {
        slug: true,
        updatedAt: true,
        meta: {
          robots: true,
        },
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultEntries = [
      {
        loc: `${siteURL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${siteURL}/posts`,
        lastmod: dateFallback,
      },
    ]

    const pageEntries = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && page.meta?.robots !== 'noindex')
          .map((page) => ({
            loc: page?.slug === 'home' ? `${siteURL}/` : `${siteURL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      : []

    return [...defaultEntries, ...pageEntries]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export const getPostsSitemapEntries = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteURL = getSiteURL()

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          indexableRobotsWhere,
        ],
      },
      select: {
        slug: true,
        updatedAt: true,
        meta: {
          robots: true,
        },
      },
    })

    const dateFallback = new Date().toISOString()

    return results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug) && post.meta?.robots !== 'noindex')
          .map((post) => ({
            loc: `${siteURL}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

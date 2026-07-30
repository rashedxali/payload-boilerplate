import { getServerSideURL } from '@/utilities/getURL'

export type SitemapResource = {
  /** URL path served by the app router, e.g. /pages-sitemap.xml */
  path: `/${string}.xml`
  slug: string
  title: string
}

export const sitemapResources = [
  {
    slug: 'pages',
    path: '/pages-sitemap.xml',
    title: 'Pages',
  },
  {
    slug: 'posts',
    path: '/posts-sitemap.xml',
    title: 'Blogs',
  },
] as const satisfies readonly SitemapResource[]

export function getSitemapResourcePaths(): SitemapResource['path'][] {
  return sitemapResources.map((resource) => resource.path)
}

export function getSitemapIndexUrls(): string[] {
  const siteURL = getServerSideURL()

  return sitemapResources.map((resource) => `${siteURL}${resource.path}`)
}

export function getPrimarySitemapUrl(): string {
  return `${getServerSideURL()}/sitemap.xml`
}

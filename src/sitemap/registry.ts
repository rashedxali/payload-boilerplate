import type { DocumentCollection } from '@/utilities/getDocumentURL'
import { documentCollections } from '@/utilities/getDocumentURL'
import { getServerSideURL } from '@/utilities/getURL'

export type SitemapCollectionResource = {
  collection: DocumentCollection
  title: string
}

const collectionTitles: Record<DocumentCollection, string> = {
  pages: 'Pages',
  blogs: 'Blogs',
  services: 'Services',
  'our-work': 'Our Work',
  guides: 'Guides',
}

/** Frontend document collections included in the sitemap index. Add collections in getDocumentURL.ts. */
export const sitemapCollections: readonly SitemapCollectionResource[] = documentCollections.map(
  (collection) => ({
    collection,
    title: collectionTitles[collection],
  }),
)

export function getSitemapFilename(collection: DocumentCollection): string {
  return `${collection}-sitemap.xml`
}

export function getSitemapPath(collection: DocumentCollection): string {
  return `/${getSitemapFilename(collection)}`
}

export function getSitemapCacheTag(collection: DocumentCollection): string {
  return `${collection}-sitemap`
}

export function getSitemapResourceByFilename(
  filename: string,
): SitemapCollectionResource | undefined {
  return sitemapCollections.find((resource) => getSitemapFilename(resource.collection) === filename)
}

export function getSitemapResourcePaths(): string[] {
  return sitemapCollections.map((resource) => getSitemapPath(resource.collection))
}

export function getSitemapIndexUrls(): string[] {
  const siteURL = getServerSideURL()

  return getSitemapResourcePaths().map((path) => `${siteURL}${path}`)
}

export function getPrimarySitemapUrl(): string {
  return `${getServerSideURL()}/sitemap.xml`
}

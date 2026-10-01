import { getServerSideURL } from './getURL'

/**
 * Collections whose documents are addressable on the frontend. Each one is served
 * from a route segment named after its slug, so paths are derived rather than mapped.
 * `pages` is the exception: it owns the root.
 */
export const documentCollections = ['pages', 'blogs'] as const

export type DocumentCollection = (typeof documentCollections)[number]

export function isDocumentCollection(value: unknown): value is DocumentCollection {
  return documentCollections.includes(value as DocumentCollection)
}

/** Path of a collection's archive, e.g. `/blogs`. */
export function getCollectionPath(collection: DocumentCollection): string {
  return collection === 'pages' ? '/' : `/${collection}`
}

export function getDocumentPath(
  slug: string | undefined | null,
  collection: DocumentCollection,
): string {
  if (!slug) return '/'

  if (collection === 'pages') {
    return slug === 'home' ? '/' : `/${slug}`
  }

  return `/${collection}/${slug}`
}

export function getDocumentURL(
  slug: string | undefined | null,
  collection: DocumentCollection,
): string {
  const baseURL = getServerSideURL()
  const path = getDocumentPath(slug, collection)

  if (path === '/') {
    return `${baseURL}/`
  }

  return `${baseURL}${path}`
}

import { getServerSideURL } from './getURL'

export function getDocumentPath(
  slug: string | undefined | null,
  collection: 'pages' | 'posts',
): string {
  if (!slug) return '/'

  if (collection === 'posts') {
    return `/posts/${slug}`
  }

  return slug === 'home' ? '/' : `/${slug}`
}

export function getDocumentURL(
  slug: string | undefined | null,
  collection: 'pages' | 'posts',
): string {
  const baseURL = getServerSideURL()
  const path = getDocumentPath(slug, collection)

  if (path === '/') {
    return `${baseURL}/`
  }

  return `${baseURL}${path}`
}

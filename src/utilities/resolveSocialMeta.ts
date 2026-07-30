import type { Blog, Media, Page } from '@/payload-types'

type SeoDoc = Partial<Page> | Partial<Blog> | null

export type ResolvedSocialMeta = {
  description: string
  image?: Media | number | null
  title: string
}

export function resolveOpenGraphMeta(doc: SeoDoc): ResolvedSocialMeta {
  return {
    title: doc?.meta?.social?.openGraph?.title || doc?.meta?.title || doc?.title || '',
    description: doc?.meta?.social?.openGraph?.description || doc?.meta?.description || '',
    image: doc?.meta?.social?.openGraph?.image,
  }
}

export function resolveTwitterMeta(doc: SeoDoc): ResolvedSocialMeta {
  const openGraph = resolveOpenGraphMeta(doc)

  return {
    title: doc?.meta?.social?.twitter?.title || openGraph.title,
    description: doc?.meta?.social?.twitter?.description || openGraph.description,
    image: doc?.meta?.social?.twitter?.image || doc?.meta?.social?.openGraph?.image,
  }
}

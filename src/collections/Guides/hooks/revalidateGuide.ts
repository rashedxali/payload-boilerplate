import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Guide } from '../../../payload-types'
import { getSitemapCacheTag } from '@/sitemap/registry'
import { getDocumentPath } from '../../../utilities/getDocumentURL'

export const revalidateGuide: CollectionAfterChangeHook<Guide> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getDocumentPath(doc.slug, 'guides')

      payload.logger.info(`Revalidating guide at path: ${path}`)

      revalidatePath(path)
      revalidateTag(getSitemapCacheTag('guides'), 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(getDocumentPath(previousDoc.slug, 'guides'))
      revalidateTag(getSitemapCacheTag('guides'), 'max')
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Guide> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(getDocumentPath(doc.slug, 'guides'))
    revalidateTag(getSitemapCacheTag('guides'), 'max')
  }

  return doc
}

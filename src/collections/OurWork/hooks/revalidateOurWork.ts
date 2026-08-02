import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { OurWorkItem } from '../../../payload-types'
import { getSitemapCacheTag } from '@/sitemap/registry'
import { getCollectionPath, getDocumentPath } from '../../../utilities/getDocumentURL'

const archivePath = getCollectionPath('our-work')

export const revalidateOurWork: CollectionAfterChangeHook<OurWorkItem> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getDocumentPath(doc.slug, 'our-work')
      payload.logger.info(`Revalidating our work item at path: ${path}`)
      revalidatePath(path)
      revalidatePath(archivePath)
      revalidateTag(getSitemapCacheTag('our-work'), 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(getDocumentPath(previousDoc.slug, 'our-work'))
      revalidatePath(archivePath)
      revalidateTag(getSitemapCacheTag('our-work'), 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<OurWorkItem> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(getDocumentPath(doc.slug, 'our-work'))
    revalidatePath(archivePath)
    revalidateTag(getSitemapCacheTag('our-work'), 'max')
  }
  return doc
}

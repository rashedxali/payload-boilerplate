import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'
import { getSitemapCacheTag } from '@/sitemap/registry'
import { getCollectionPath, getDocumentPath } from '../../../utilities/getDocumentURL'

const archivePath = getCollectionPath('services')

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getDocumentPath(doc.slug, 'services')
      payload.logger.info(`Revalidating service at path: ${path}`)
      revalidatePath(path)
      revalidatePath(archivePath)
      revalidateTag(getSitemapCacheTag('services'), 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(getDocumentPath(previousDoc.slug, 'services'))
      revalidatePath(archivePath)
      revalidateTag(getSitemapCacheTag('services'), 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Service> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(getDocumentPath(doc.slug, 'services'))
    revalidatePath(archivePath)
    revalidateTag(getSitemapCacheTag('services'), 'max')
  }
  return doc
}

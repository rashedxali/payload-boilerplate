import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Blog } from '../../../payload-types'
import { getCollectionPath, getDocumentPath } from '../../../utilities/getDocumentURL'

const archivePath = getCollectionPath('blogs')

export const revalidateBlog: CollectionAfterChangeHook<Blog> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getDocumentPath(doc.slug, 'blogs')

      payload.logger.info(`Revalidating blog at path: ${path}`)

      revalidatePath(path)
      revalidatePath(archivePath)
      revalidateTag('posts-sitemap', 'max')
    }

    // If the blog was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = getDocumentPath(previousDoc.slug, 'blogs')

      payload.logger.info(`Revalidating old blog at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath(archivePath)
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Blog> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = getDocumentPath(doc?.slug, 'blogs')

    revalidatePath(path)
    revalidatePath(archivePath)
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}

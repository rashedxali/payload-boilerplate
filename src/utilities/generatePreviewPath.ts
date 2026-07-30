import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest } from 'payload'

import { getDocumentPath, type DocumentCollection } from './getDocumentURL'

type Props = {
  collection: DocumentCollection
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedParams = new URLSearchParams({
    // Encode to support slugs with special characters
    path: getDocumentPath(encodeURIComponent(slug), collection),
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}

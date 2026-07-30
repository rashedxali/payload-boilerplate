import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import type { DocumentCollection } from './getDocumentURL'

export const queryDocumentBySlug = cache(
  async <T extends DocumentCollection>(
    collection: T,
    slug: string,
  ) => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection,
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      depth: 2,
      where: {
        slug: { equals: slug },
      },
    })

    return result.docs?.[0] || null
  },
)

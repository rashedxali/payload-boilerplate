import type { CollectionAfterReadHook, CollectionBeforeChangeHook } from 'payload'

import { normalizeTitleFields } from '@/utilities/stringToTitleLexical'

export const normalizeLayoutTitlesAfterRead: CollectionAfterReadHook = ({ doc }) => {
  if (doc?.layout) {
    doc.layout = normalizeTitleFields(doc.layout)
  }

  return doc
}

export const normalizeLayoutTitlesBeforeChange: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.layout) {
    data.layout = normalizeTitleFields(data.layout)
  }

  return data
}

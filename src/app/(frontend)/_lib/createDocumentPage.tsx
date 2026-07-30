import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Config } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath, type DocumentCollection } from '@/utilities/getDocumentURL'
import { queryDocumentBySlug } from '@/utilities/queryDocumentBySlug'

type Args = {
  params: Promise<{ slug: string }>
}

/**
 * Collections this factory serves. `pages` owns the root route and its own home-slug
 * handling; `guides` renders a file download rather than a content document.
 */
type ContentCollection = Extract<DocumentCollection, 'blogs' | 'services' | 'our-work'>

type DocumentOf<T extends ContentCollection> = Config['collections'][T]

type Options<T extends ContentCollection> = {
  collection: T
  /** Renders the document body. Redirects, live preview and JSON-LD are handled here. */
  render: (doc: DocumentOf<T>) => ReactNode
  staticParamsLimit?: number
}

/**
 * Builds the three route exports every document page needs. The URL is derived from
 * the collection slug, so a collection only has to say how its body renders.
 */
export function createDocumentPage<T extends ContentCollection>({
  collection,
  render,
  staticParamsLimit = 1000,
}: Options<T>) {
  async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection,
      draft: false,
      limit: staticParamsLimit,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })

    // `select` reshapes the doc type into something the generic can't see through.
    return result.docs.flatMap((doc) => {
      const { slug } = doc as { slug?: string | null }
      return slug ? [{ slug }] : []
    })
  }

  async function Page({ params }: Args) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const url = getDocumentPath(decodedSlug, collection)
    const { isEnabled: draft } = await draftMode()
    const doc = await queryDocumentBySlug(collection, decodedSlug)

    if (!doc) {
      return <PayloadRedirects url={url} />
    }

    return (
      <>
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <JsonLd data={doc.meta?.jsonLd} />
        {render(doc)}
      </>
    )
  }

  async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params
    const doc = await queryDocumentBySlug(collection, decodeURIComponent(slug))

    return generateMeta({ collection, doc })
  }

  return { Page, generateMetadata, generateStaticParams }
}

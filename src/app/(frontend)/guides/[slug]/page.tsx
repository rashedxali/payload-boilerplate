import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import DownloadPageClient from './DownloadClient'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function DownloadPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'guides',
    limit: 1,
    depth: 2,
    where: { slug: { equals: slug } },
  })

  const guide = result.docs[0]
  if (!guide) {
    return (
      <div className="container py-28">
        <h1>Guide not found</h1>
      </div>
    )
  }

  const file =
    typeof guide.file === 'object' && guide.file?.url ? guide.file.url : ''

  return <DownloadPageClient guideTitle={guide.title} fileUrl={file} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'guides',
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return { title: result.docs[0]?.title || 'Download' }
}

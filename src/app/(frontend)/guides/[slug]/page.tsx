import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryDocumentBySlug } from '@/utilities/queryDocumentBySlug'

import DownloadPageClient from './DownloadClient'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function DownloadPage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const guide = await queryDocumentBySlug('guides', decodeURIComponent(slug))

  if (!guide) {
    return (
      <div className="container py-28">
        <h1>Guide not found</h1>
      </div>
    )
  }

  const file =
    typeof guide.file === 'object' && guide.file?.url ? guide.file.url : ''

  return (
    <>
      {draft && <LivePreviewListener />}
      <DownloadPageClient guideTitle={guide.title} fileUrl={file} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const guide = await queryDocumentBySlug('guides', decodeURIComponent(slug))

  return { title: guide?.title || 'Download' }
}

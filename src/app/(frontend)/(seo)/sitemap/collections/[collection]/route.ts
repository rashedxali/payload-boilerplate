import { getServerSideSitemap } from 'next-sitemap'

import { getCollectionSitemapEntries } from '@/sitemap/queries'
import { getSitemapResourceByFilename, getSitemapFilename } from '@/sitemap/registry'
import { getSitemapSettingsResponse } from '@/sitemap/shared'
import { isDocumentCollection } from '@/utilities/getDocumentURL'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ collection: string }>
}

export async function GET(_request: Request, { params }: Args) {
  const disabledResponse = await getSitemapSettingsResponse()

  if (disabledResponse) {
    return disabledResponse
  }

  const { collection } = await params

  if (!isDocumentCollection(collection)) {
    return new Response('Not Found', { status: 404 })
  }

  const resource = getSitemapResourceByFilename(getSitemapFilename(collection))

  if (!resource) {
    return new Response('Not Found', { status: 404 })
  }

  const sitemap = await getCollectionSitemapEntries(resource)

  return getServerSideSitemap(sitemap)
}

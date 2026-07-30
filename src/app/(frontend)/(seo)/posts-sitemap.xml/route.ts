import { getServerSideSitemap } from 'next-sitemap'

import { getPostsSitemapEntries } from '@/sitemap/queries'
import { getSitemapSettingsResponse } from '@/sitemap/shared'

export async function GET() {
  const disabledResponse = await getSitemapSettingsResponse()

  if (disabledResponse) {
    return disabledResponse
  }

  const sitemap = await getPostsSitemapEntries()

  return getServerSideSitemap(sitemap)
}

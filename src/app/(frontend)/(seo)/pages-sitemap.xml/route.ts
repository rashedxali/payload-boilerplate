import { getServerSideSitemap } from 'next-sitemap'

import { getPagesSitemapEntries } from '@/sitemap/queries'
import { getSitemapSettingsResponse } from '@/sitemap/shared'

export async function GET() {
  const disabledResponse = await getSitemapSettingsResponse()

  if (disabledResponse) {
    return disabledResponse
  }

  const sitemap = await getPagesSitemapEntries()

  return getServerSideSitemap(sitemap)
}

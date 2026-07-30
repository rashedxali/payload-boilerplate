import { getServerSideSitemapIndex } from 'next-sitemap'

import { getSitemapIndexUrls } from '@/sitemap/registry'
import { getSitemapSettingsResponse } from '@/sitemap/shared'

export async function GET() {
  const disabledResponse = await getSitemapSettingsResponse()

  if (disabledResponse) {
    return disabledResponse
  }

  return getServerSideSitemapIndex(getSitemapIndexUrls())
}

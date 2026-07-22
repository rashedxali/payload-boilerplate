import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getPublicAnalyticsConfig } from '@/utilities/getAnalyticsConfig'

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 0,
  })

  return Response.json(getPublicAnalyticsConfig(settings))
}

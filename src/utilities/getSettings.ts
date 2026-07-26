import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Setting } from '@/payload-types'

export async function getSettings(): Promise<Setting> {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'settings',
    depth: 1,
  })
}

export const getCachedSettings = unstable_cache(async () => getSettings(), ['global_settings'], {
  tags: ['global_settings'],
})

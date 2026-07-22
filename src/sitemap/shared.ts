import { getCachedSettings } from '@/utilities/getSettings'
import { isSitemapEnabled } from '@/utilities/buildRobotsTxt'

export async function getSitemapSettingsResponse(): Promise<Response | null> {
  const settings = await getCachedSettings()

  if (!isSitemapEnabled(settings)) {
    return new Response('Not Found', { status: 404 })
  }

  return null
}

export function getSiteURL(): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'
  )
}

export const indexableRobotsWhere = {
  or: [
    {
      'meta.robots': {
        not_equals: 'noindex',
      },
    },
    {
      'meta.robots': {
        exists: false,
      },
    },
  ],
} as const

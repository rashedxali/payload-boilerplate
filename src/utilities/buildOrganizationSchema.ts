import type { Setting } from '@/payload-types'

export function buildOrganizationSchema(settings: Setting): Record<string, unknown> | null {
  const name = settings.seo?.organizationName?.trim()
  const url = settings.seo?.organizationUrl?.trim()

  if (!name) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    ...(url ? { url } : {}),
  }
}

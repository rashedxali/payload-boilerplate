import type { Setting } from '@/payload-types'

import { getCachedSettings } from './getSettings'
import { getImageURL } from './getImageURL'

/** Site-wide SEO values from the Settings global. Anything not set there stays empty. */
export type SeoDefaults = {
  defaultDescription?: string
  defaultOgImageUrl?: string
  siteName: string
  titleSuffix: string
}

export function resolveSeoDefaults(settings: Setting): SeoDefaults {
  return {
    defaultDescription: settings.seo?.defaultMetaDescription?.trim() || undefined,
    defaultOgImageUrl: getImageURL(settings.seo?.defaultOgImage),
    siteName: settings.general?.siteName?.trim() || '',
    titleSuffix: settings.seo?.defaultTitleSuffix?.trim() || '',
  }
}

export function formatPageTitle(
  pageTitle: string | null | undefined,
  defaults: SeoDefaults,
): string {
  if (pageTitle?.trim()) {
    return `${pageTitle.trim()} ${defaults.titleSuffix}`.replace(/\s+/g, ' ').trim()
  }

  return defaults.siteName
}

export async function getSeoDefaults(): Promise<SeoDefaults> {
  const settings = await getCachedSettings()

  return resolveSeoDefaults(settings)
}

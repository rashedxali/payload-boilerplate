import type { Setting } from '@/payload-types'

import { getCachedSettings } from './getSettings'
import { getImageURL } from './getImageURL'

const FALLBACK_SITE_NAME = 'Payload Website Template'
const FALLBACK_DESCRIPTION = 'An open-source website built with Payload and Next.js.'
const FALLBACK_SUFFIX = '| Payload Website Template'

export type SeoDefaults = {
  defaultDescription: string
  defaultOgImageUrl: string
  siteName: string
  titleSuffix: string
}

export function resolveSeoDefaults(settings: Setting): SeoDefaults {
  const siteName = settings.general?.siteName?.trim() || FALLBACK_SITE_NAME
  const titleSuffix = settings.seo?.defaultTitleSuffix?.trim() || FALLBACK_SUFFIX
  const defaultDescription = settings.seo?.defaultMetaDescription?.trim() || FALLBACK_DESCRIPTION
  const defaultOgImageUrl = getImageURL(settings.seo?.defaultOgImage)

  return {
    defaultDescription,
    defaultOgImageUrl,
    siteName,
    titleSuffix,
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

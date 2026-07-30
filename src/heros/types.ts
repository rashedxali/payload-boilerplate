import type { Media, Page } from '@/payload-types'

/** Legacy page hero shape (removed from Pages collection; kept for unused template hero components) */
export type LegacyHeroProps = {
  type?: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | null
  richText?: Page['body']
  links?: Array<{
    link?: {
      type?: 'reference' | 'custom' | null
      newTab?: boolean | null
      url?: string | null
      label?: string | null
    }
  }> | null
  media?: number | Media | null
}

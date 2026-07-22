import type { Setting } from '@/payload-types'

import { getServerSideURL } from './getURL'

type SeoSettings = NonNullable<Setting['seo']>

export function isRobotsTxtEnabled(settings: Setting): boolean {
  return settings.seo?.robotsTxt?.status === 'enable'
}

export function isLlmsTxtEnabled(settings: Setting): boolean {
  return settings.seo?.llmsTxt?.status === 'enable'
}

export function isSitemapEnabled(settings: Setting): boolean {
  return settings.seo?.sitemap?.status !== 'disable'
}

export function buildRobotsTxt(settings: Setting): string {
  const customContent = settings.seo?.robotsTxt?.customContent?.trim()

  if (customContent) {
    return customContent
  }

  const siteURL = getServerSideURL()
  const lines = ['User-agent: *', 'Disallow: /admin/']

  if (isSitemapEnabled(settings)) {
    lines.push('', `Sitemap: ${siteURL}/pages-sitemap.xml`, `Sitemap: ${siteURL}/posts-sitemap.xml`)
  }

  return lines.join('\n')
}

export function buildLlmsTxt(settings: Setting): string {
  const customContent = settings.seo?.llmsTxt?.customContent?.trim()

  if (customContent) {
    return customContent
  }

  const siteURL = getServerSideURL()
  const siteName = settings.general?.siteName || 'Website'
  const contactEmail = settings.general?.contactEmail

  const lines = [`# ${siteName}`, `# ${siteURL}`, '', `Site: ${siteURL}`]

  if (contactEmail) {
    lines.push(`Contact: ${contactEmail}`)
  }

  if (isSitemapEnabled(settings)) {
    lines.push('', `Sitemap: ${siteURL}/pages-sitemap.xml`, `Sitemap: ${siteURL}/posts-sitemap.xml`)
  }

  return lines.join('\n')
}

export type { SeoSettings }

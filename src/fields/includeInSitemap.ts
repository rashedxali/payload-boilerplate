import type { CheckboxField } from 'payload'

export const includeInSitemapField = (): CheckboxField => ({
  name: 'includeInSitemap',
  type: 'checkbox',
  label: 'Include in sitemap',
  defaultValue: true,
  admin: {
    description: 'When unchecked, this document will be excluded from the sitemap.',
  },
})

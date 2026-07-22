import type { SelectField } from 'payload'

export const robotsField = (): SelectField => ({
  name: 'robots',
  type: 'select',
  label: 'Index / Noindex',
  defaultValue: 'index',
  options: [
    {
      label: 'Index (allow search engines)',
      value: 'index',
    },
    {
      label: 'Noindex (hide from search engines)',
      value: 'noindex',
    },
  ],
  admin: {
    description:
      'Controls search engine indexing and sitemap inclusion. Noindex pages are excluded from the sitemap.',
  },
})

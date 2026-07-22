import type { TextField } from 'payload'

export const canonicalUrlField = (): TextField => ({
  name: 'canonicalURL',
  type: 'text',
  label: 'Canonical URL',
  admin: {
    components: {
      Field: '@/fields/seo/CanonicalUrlField#CanonicalUrlField',
    },
    description: 'Leave empty to use the current content URL automatically.',
  },
  validate: (value) => {
    if (!value) return true

    try {
      new URL(value)
      return true
    } catch {
      return 'Enter a valid URL (including https://).'
    }
  },
})

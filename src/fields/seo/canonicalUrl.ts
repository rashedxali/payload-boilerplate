import type { TextField } from 'payload'

export const canonicalUrlField = (): TextField => ({
  name: 'canonicalURL',
  type: 'text',
  label: 'Canonical URL',
  admin: {
    description: 'Override the canonical URL. Leave empty to use the auto-generated page URL.',
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

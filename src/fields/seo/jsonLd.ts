import type { TextareaField } from 'payload'

export const jsonLdField = (): TextareaField => ({
  name: 'jsonLd',
  type: 'textarea',
  label: 'Schema Markup (JSON-LD)',
  admin: {
    description: 'Custom JSON-LD structured data for this page. Must be valid JSON.',
    rows: 12,
  },
  validate: (value) => {
    if (!value) return true

    try {
      JSON.parse(value)
      return true
    } catch {
      return 'Must be valid JSON.'
    }
  },
})

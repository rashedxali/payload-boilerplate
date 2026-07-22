import type { Field } from 'payload'

export const seoPreviewField = (): Field => ({
  name: 'seoPreview',
  type: 'ui',
  admin: {
    components: {
      Field: '@/fields/seo/SeoPreviewField#SeoPreviewField',
    },
  },
})

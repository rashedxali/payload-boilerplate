import type { Field } from 'payload'

const socialPlatformFields = (platform: 'Open Graph' | 'Twitter Card'): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: `${platform} title`,
    admin: {
      description: `Optional. Falls back to the SEO title when empty.`,
    },
  },
  {
    name: 'description',
    type: 'textarea',
    label: `${platform} description`,
    admin: {
      description: `Optional. Falls back to the SEO description when empty.`,
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: `${platform} image`,
    admin: {
      description:
        platform === 'Open Graph'
          ? 'Recommended size: 1200 x 630. Falls back to the SEO image when empty.'
          : 'Recommended size: 1200 x 630. Falls back to Open Graph image, then SEO image.',
    },
  },
]

export const socialSharingFields = (): Field => ({
  name: 'social',
  type: 'group',
  label: 'Social sharing',
  admin: {
    description:
      'Per-page Open Graph and Twitter overrides. Leave fields empty to inherit SEO title, description, and image.',
  },
  fields: [
    {
      name: 'openGraph',
      type: 'group',
      label: 'Open Graph',
      fields: socialPlatformFields('Open Graph'),
    },
    {
      name: 'twitter',
      type: 'group',
      label: 'Twitter Card',
      fields: socialPlatformFields('Twitter Card'),
    },
  ],
})

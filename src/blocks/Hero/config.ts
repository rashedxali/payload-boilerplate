import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    plural: 'Hero Blocks',
    singular: 'Hero Block',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        description: 'Avatars shown in the social proof row. Hover to see profile details.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'socialLink',
          type: 'text',
          admin: {
            description: 'LinkedIn or other social profile URL.',
          },
        },
      ],
    },
    {
      name: 'rating',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    }
  ],
}

import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const OurStory: Block = {
  slug: 'ourStory',
  interfaceName: 'OurStoryBlock',
  labels: { singular: 'Our Story', plural: 'Our Story' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    {
      name: 'yearItems',
      type: 'array',
      fields: [
        optionalText('year', 'Year'),
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('image', 'Image'),
      ],
    },
  ],
}

import type { Block } from 'payload'

import { optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const OurStory: Block = {
  slug: 'ourStory',
  interfaceName: 'OurStoryBlock',
  labels: { singular: 'Our Story', plural: 'Our Story' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    {
      name: 'yearItems',
      type: 'array',
      fields: [
        optionalText('year', 'Year'),
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('image', 'Image'),
      ],
    },
  ],
}

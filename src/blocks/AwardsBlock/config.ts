import type { Block } from 'payload'

import { optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const AwardsBlock: Block = {
  slug: 'awardsBlock',
  interfaceName: 'AwardsBlockBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Awards', plural: 'Awards' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalUpload('image', 'Image'),
        optionalTitle('title', 'Title'),
      ],
    },
  ],
}

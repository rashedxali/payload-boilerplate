import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const AwardsBlock: Block = {
  slug: 'awardsBlock',
  interfaceName: 'AwardsBlockBlock',
  labels: { singular: 'Awards', plural: 'Awards' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalUpload('image', 'Image'),
        optionalText('title', 'Title'),
      ],
    },
  ],
}

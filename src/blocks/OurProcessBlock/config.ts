import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const OurProcessBlock: Block = {
  slug: 'ourProcessBlock',
  interfaceName: 'OurProcessBlockBlock',
  labels: { singular: 'Our Process (Home)', plural: 'Our Process (Home)' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

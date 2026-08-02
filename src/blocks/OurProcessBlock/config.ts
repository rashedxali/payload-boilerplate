import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const OurProcessBlock: Block = {
  slug: 'ourProcessBlock',
  interfaceName: 'OurProcessBlockBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Our Process (Home)', plural: 'Our Process (Home)' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

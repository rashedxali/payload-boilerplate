import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const OurProcess: Block = {
  slug: 'ourProcess',
  interfaceName: 'OurProcessBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Our Process', plural: 'Our Process' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

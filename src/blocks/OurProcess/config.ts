import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const OurProcess: Block = {
  slug: 'ourProcess',
  interfaceName: 'OurProcessBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Our Process', plural: 'Our Process' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const NumbersSection: Block = {
  slug: 'numbersSection',
  interfaceName: 'NumbersSectionBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Numbers Section', plural: 'Numbers Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalText('description', 'Description'),
      ],
    },
  ],
}

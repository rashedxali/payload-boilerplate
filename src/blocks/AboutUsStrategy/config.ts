import type { Block } from 'payload'

import { htmlField, optionalText, optionalTitle } from '@/blocks/shared/fields'

export const AboutUsStrategy: Block = {
  slug: 'aboutUsStrategy',
  admin: {
    disableBlockName: true,
  },
  interfaceName: 'AboutUsStrategyBlock',
  labels: { singular: 'About Us Strategy', plural: 'About Us Strategy' },
  fields: [
    htmlField('description', 'Description'),
    {
      name: 'numbers',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalTitle('title', 'Title'),
      ],
    },
  ],
}

import type { Block } from 'payload'

import { htmlField, optionalText } from '@/blocks/shared/fields'

export const AboutUsStrategy: Block = {
  slug: 'aboutUsStrategy',
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
        optionalText('title', 'Title'),
      ],
    },
  ],
}

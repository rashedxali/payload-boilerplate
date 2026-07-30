import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlock',
  labels: { singular: 'Our Approach', plural: 'Our Approach Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('itemDescription', 'Description', true),
      ],
    },
  ],
}

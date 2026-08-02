import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Our Approach', plural: 'Our Approach Sections' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('itemDescription', 'Description', true),
      ],
    },
  ],
}

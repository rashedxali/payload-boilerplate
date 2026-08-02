import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const CaseStudiesBlock: Block = {
  slug: 'caseStudiesBlock',
  interfaceName: 'CaseStudiesBlockBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Case Studies', plural: 'Case Studies Blocks' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured', value: 'featured' },
        { label: 'Slider', value: 'slider' },
        { label: 'All', value: 'all' },
      ],
    },
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    optionalText('customClass', 'Custom CSS Class'),
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'caseStudy',
          type: 'relationship',
          relationTo: 'our-work',
        },
      ],
    },
  ],
}

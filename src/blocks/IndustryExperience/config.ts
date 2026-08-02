import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const IndustryExperience: Block = {
  slug: 'industryExperience',
  interfaceName: 'IndustryExperienceBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Industry Experience', plural: 'Industry Experience' },
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

import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const IndustryExperience: Block = {
  slug: 'industryExperience',
  interfaceName: 'IndustryExperienceBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Industry Experience', plural: 'Industry Experience' },
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

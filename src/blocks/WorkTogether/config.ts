import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const WorkTogether: Block = {
  slug: 'workTogether',
  interfaceName: 'WorkTogetherBlock',
  labels: { singular: 'Work Together', plural: 'Work Together' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('primaryButtonTitle', 'Primary Button Title'),
    optionalText('primaryButtonUrl', 'Primary Button URL'),
    optionalText('secondaryButtonTitle', 'Secondary Button Title'),
    optionalText('secondaryButtonUrl', 'Secondary Button URL'),
  ],
}

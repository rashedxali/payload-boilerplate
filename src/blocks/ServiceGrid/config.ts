import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle } from '@/blocks/shared/fields'

export const ServiceGrid: Block = {
  slug: 'serviceGrid',
  interfaceName: 'ServiceGridBlock',
  labels: { singular: 'Service Grid', plural: 'Service Grids' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Alternate', value: 'alt' },
        { label: 'Simple', value: 'simple' },
      ],
    },
    optionalTitle('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('subtitle', 'Subtitle'),
        optionalText('description', 'Description', true),
        optionalText('buttonTitle', 'Button Title'),
        optionalText('url', 'URL'),
      ],
    },
  ],
}

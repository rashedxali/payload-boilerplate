import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const BrandsBlock: Block = {
  slug: 'brandsBlock',
  interfaceName: 'BrandsBlockBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Brands', plural: 'Brands Blocks' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
      ],
    },
    optionalTitle('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [optionalUpload('image', 'Brand Logo')],
    },
  ],
}

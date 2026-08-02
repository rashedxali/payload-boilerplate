import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlockBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  admin: {
    disableBlockName: true,
  },
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
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('description', 'Description', true),
        optionalText('name', 'Name'),
        optionalText('position', 'Position'),
        optionalUpload('image', 'Image'),
      ],
    },
  ],
}

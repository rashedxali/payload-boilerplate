import type { Block } from 'payload'

import { htmlField, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const IncludedServices: Block = {
  slug: 'includedServices',
  interfaceName: 'IncludedServicesBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Included Services', plural: 'Included Services' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'services',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('subtitle', 'Subtitle'),
        optionalUpload('image', 'Image'),
        htmlField('description', 'Description'),
      ],
    },
  ],
}

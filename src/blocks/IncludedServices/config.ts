import type { Block } from 'payload'

import { htmlField, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const IncludedServices: Block = {
  slug: 'includedServices',
  interfaceName: 'IncludedServicesBlock',
  labels: { singular: 'Included Services', plural: 'Included Services' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'services',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('subtitle', 'Subtitle'),
        optionalUpload('image', 'Image'),
        htmlField('description', 'Description'),
      ],
    },
  ],
}

import type { Block } from 'payload'

import { optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const AwardsRecognition: Block = {
  slug: 'awardsRecognition',
  interfaceName: 'AwardsRecognitionBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Awards Recognition', plural: 'Awards Recognition' },
  fields: [
    optionalUpload('image', 'Image'),
    optionalTitle('title', 'Title'),
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

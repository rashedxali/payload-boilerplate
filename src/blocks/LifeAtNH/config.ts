import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const LifeAtNH: Block = {
  slug: 'lifeAtNH',
  interfaceName: 'LifeAtNHBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Life at Notionhive', plural: 'Life at Notionhive' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('shortDescription', 'Short Description'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('image', 'Image'),
        buttonGroup('button'),
      ],
    },
  ],
}

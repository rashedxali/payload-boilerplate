import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const UspTable: Block = {
  slug: 'uspTable',
  interfaceName: 'UspTableBlock',
  labels: { singular: 'USP Table', plural: 'USP Tables' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('tableTitle', 'Table Title'),
    optionalUpload('logo', 'Logo'),
    {
      name: 'columns',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        optionalText('feature', 'Feature'),
        optionalText('notionhive', 'Notionhive'),
        optionalText('inhouse', 'In-house'),
        optionalText('freelancers', 'Freelancers'),
      ],
    },
  ],
}

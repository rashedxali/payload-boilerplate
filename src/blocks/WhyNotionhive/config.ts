import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const WhyNotionhive: Block = {
  slug: 'whyNotionhive',
  interfaceName: 'WhyNotionhiveBlock',
  labels: { singular: 'Why Notionhive', plural: 'Why Notionhive Sections' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('title', 'Title'),
    optionalUpload('centerIcon', 'Center Icon'),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('icon', 'Icon'),
      ],
    },
  ],
}

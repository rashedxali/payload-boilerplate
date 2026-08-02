import type { Block } from 'payload'

import { optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const WhyNotionhive: Block = {
  slug: 'whyNotionhive',
  interfaceName: 'WhyNotionhiveBlock',
  labels: { singular: 'Why Notionhive', plural: 'Why Notionhive Sections' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalTitle('title', 'Title'),
    optionalUpload('centerIcon', 'Center Icon'),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('icon', 'Icon'),
      ],
    },
  ],
}

import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const TitleWithTabs: Block = {
  slug: 'titleWithTabs',
  interfaceName: 'TitleWithTabsBlock',
  labels: { singular: 'Title With Tabs', plural: 'Title With Tabs' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'tabs',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

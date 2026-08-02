import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const TitleWithTabs: Block = {
  slug: 'titleWithTabs',
  interfaceName: 'TitleWithTabsBlock',
  labels: { singular: 'Title With Tabs', plural: 'Title With Tabs' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'tabs',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

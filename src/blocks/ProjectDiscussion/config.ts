import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const ProjectDiscussion: Block = {
  slug: 'projectDiscussion',
  interfaceName: 'ProjectDiscussionBlock',
  labels: { singular: 'Project Discussion', plural: 'Project Discussion' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
  ],
}

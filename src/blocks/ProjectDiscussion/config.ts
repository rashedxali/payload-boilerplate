import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const ProjectDiscussion: Block = {
  slug: 'projectDiscussion',
  interfaceName: 'ProjectDiscussionBlock',
  labels: { singular: 'Project Discussion', plural: 'Project Discussion' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
  ],
}

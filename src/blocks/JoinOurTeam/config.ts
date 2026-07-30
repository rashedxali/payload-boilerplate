import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const JoinOurTeam: Block = {
  slug: 'joinOurTeam',
  interfaceName: 'JoinOurTeamBlock',
  labels: { singular: 'Join Our Team', plural: 'Join Our Team' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalUpload('imageOne', 'Image One'),
    optionalUpload('imageTwo', 'Image Two'),
    buttonGroup('button'),
  ],
}

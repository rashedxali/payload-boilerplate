import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const JoinOurTeam: Block = {
  slug: 'joinOurTeam',
  interfaceName: 'JoinOurTeamBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Join Our Team', plural: 'Join Our Team' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalUpload('imageOne', 'Image One'),
    optionalUpload('imageTwo', 'Image Two'),
    buttonGroup('button'),
  ],
}

import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const LevelUpCTA: Block = {
  slug: 'levelUpCTA',
  interfaceName: 'LevelUpCTABlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Level Up CTA', plural: 'Level Up CTAs' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    optionalUpload('image', 'Image'),
  ],
}

import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const LevelUpCTA: Block = {
  slug: 'levelUpCTA',
  interfaceName: 'LevelUpCTABlock',
  labels: { singular: 'Level Up CTA', plural: 'Level Up CTAs' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    optionalUpload('image', 'Image'),
  ],
}

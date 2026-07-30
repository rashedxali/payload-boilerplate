import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const BusinessBlock: Block = {
  slug: 'businessBlock',
  interfaceName: 'BusinessBlockBlock',
  labels: { singular: 'Grow Business', plural: 'Grow Business Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('buttonText', 'Button Text'),
    optionalUpload('image', 'Image'),
    optionalText('customClass', 'Custom CSS Class'),
  ],
}

import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const ContactUsSection: Block = {
  slug: 'contactUsSection',
  interfaceName: 'ContactUsSectionBlock',
  labels: { singular: 'Contact Us Section', plural: 'Contact Us Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'listItems',
      type: 'array',
      fields: [{ name: 'listText', type: 'text', label: 'List Item' }],
    },
  ],
}

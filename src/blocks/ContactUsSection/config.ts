import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const ContactUsSection: Block = {
  slug: 'contactUsSection',
  interfaceName: 'ContactUsSectionBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Contact Us Section', plural: 'Contact Us Sections' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'listItems',
      type: 'array',
      fields: [{ name: 'listText', type: 'text', label: 'List Item' }],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description:
          'Select a form from the Forms collection. Manage fields and select options under Forms in the admin sidebar.',
      },
    },
  ],
}

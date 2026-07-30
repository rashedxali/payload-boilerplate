import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const OurClients: Block = {
  slug: 'ourClients',
  interfaceName: 'OurClientsBlock',
  labels: { singular: 'Our Clients', plural: 'Our Clients' },
  fields: [
    {
      name: 'clients',
      type: 'array',
      fields: [
        optionalText('name', 'Name'),
        optionalUpload('logo', 'Logo'),
      ],
    },
  ],
}

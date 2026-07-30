import type { Block } from 'payload'

import { htmlField, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const OfficeAddress: Block = {
  slug: 'officeAddress',
  interfaceName: 'OfficeAddressBlock',
  labels: { singular: 'Office Address', plural: 'Office Address' },
  fields: [
    optionalText('title', 'Title'),
    optionalUpload('image', 'Image'),
    {
      name: 'addresses',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        htmlField('address', 'Address'),
        { name: 'googleMapUrl', type: 'text', label: 'Google Map URL' },
      ],
    },
  ],
}

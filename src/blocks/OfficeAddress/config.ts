import type { Block } from 'payload'

import { htmlField, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const OfficeAddress: Block = {
  slug: 'officeAddress',
  interfaceName: 'OfficeAddressBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Office Address', plural: 'Office Address' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalUpload('image', 'Image'),
    {
      name: 'addresses',
      type: 'array',
      fields: [
        optionalTitle('title', 'Title'),
        htmlField('address', 'Address'),
        { name: 'googleMapUrl', type: 'text', label: 'Google Map URL' },
      ],
    },
  ],
}

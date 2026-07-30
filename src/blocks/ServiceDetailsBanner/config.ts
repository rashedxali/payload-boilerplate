import type { Block } from 'payload'

import { optionalText, optionalUpload } from '@/blocks/shared/fields'

export const ServiceDetailsBanner: Block = {
  slug: 'serviceDetailsBanner',
  interfaceName: 'ServiceDetailsBannerBlock',
  labels: { singular: 'Service Details Banner', plural: 'Service Details Banners' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalUpload('image', 'Image'),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
}

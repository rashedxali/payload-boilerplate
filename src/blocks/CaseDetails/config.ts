import type { Block } from 'payload'

import { htmlField, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const CaseDetails: Block = {
  slug: 'caseDetails',
  interfaceName: 'CaseDetailsBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Case Details', plural: 'Case Details' },
  fields: [
    optionalUpload('bannerImage', 'Banner Image'),
    optionalText('subtitle', 'Subtitle'),
    htmlField('description', 'Description'),
    {
      name: 'gallery',
      type: 'array',
      fields: [optionalUpload('image', 'Image')],
    },
    {
      name: 'project',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalTitle('title', 'Title'),
      ],
    },
    optionalUpload('fullWidthImageTwo', 'Full Width Image'),
    { name: 'youtubeVideoLink', type: 'text', label: 'YouTube Video URL' },
    {
      name: 'galleryTwo',
      type: 'array',
      fields: [
        optionalUpload('image', 'Image'),
        optionalText('description', 'Description', true),
      ],
    },
    htmlField('descriptionTwo', 'Description Two'),
  ],
}

import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Home Hero', plural: 'Home Heroes' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    { name: 'bannerVideo', type: 'text', label: 'Banner Video URL' },
    optionalUpload('bannerImage', 'Banner Image'),
    {
      name: 'highlights',
      type: 'array',
      fields: [optionalTitle('title', 'Title')],
    },
    {
      name: 'clientLogos',
      type: 'array',
      fields: [optionalUpload('image', 'Logo')],
    },
    optionalText('clientSliderTitle', 'Client Slider Title'),
    optionalText('shortDescription', 'Short Description'),
  ],
}

import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: { singular: 'Home Hero', plural: 'Home Heroes' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    { name: 'bannerVideo', type: 'text', label: 'Banner Video URL' },
    optionalUpload('bannerImage', 'Banner Image'),
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'title', type: 'text' }],
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

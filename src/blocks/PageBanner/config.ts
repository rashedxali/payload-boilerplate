import type { Block } from 'payload'

import { optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const PageBanner: Block = {
  slug: 'pageBanner',
  interfaceName: 'PageBannerBlock',
  labels: { singular: 'Page Banner', plural: 'Page Banners' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('pageTitle', 'Page Title'),
    optionalUpload('image', 'Image'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
  ],
}

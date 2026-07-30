import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const CaseStudiesBanner: Block = {
  slug: 'caseStudiesBanner',
  interfaceName: 'CaseStudiesBannerBlock',
  labels: { singular: 'Case Studies Banner', plural: 'Case Studies Banners' },
  fields: [optionalText('title', 'Title')],
}

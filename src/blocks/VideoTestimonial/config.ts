import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const VideoTestimonial: Block = {
  slug: 'videoTestimonial',
  interfaceName: 'VideoTestimonialBlock',
  labels: { singular: 'Video Testimonial', plural: 'Video Testimonials' },
  fields: [
    {
      name: 'videos',
      type: 'array',
      fields: [
        { name: 'videoUrl', type: 'text', label: 'Video URL' },
        optionalText('title', 'Title'),
      ],
    },
  ],
}

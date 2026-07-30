import type { Block } from 'payload'

import { optionalText } from '@/blocks/shared/fields'

export const BookConsultation: Block = {
  slug: 'bookConsultation',
  interfaceName: 'BookConsultationBlock',
  labels: { singular: 'Book Consultation', plural: 'Book Consultation' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    { name: 'iframe', type: 'text', label: 'Calendly Embed URL' },
  ],
}

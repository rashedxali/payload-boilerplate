import type { Block } from 'payload'

import { optionalText, optionalTitle } from '@/blocks/shared/fields'

export const BookConsultation: Block = {
  slug: 'bookConsultation',
  interfaceName: 'BookConsultationBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Book Consultation', plural: 'Book Consultation' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    { name: 'iframe', type: 'text', label: 'Calendly Embed URL' },
  ],
}

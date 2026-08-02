import type { Block } from 'payload'

import { buttonGroup, optionalText } from '@/blocks/shared/fields'

export const CaseSummary: Block = {
  slug: 'caseSummary',
  interfaceName: 'CaseSummaryBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Case Summary', plural: 'Case Summaries' },
  fields: [
    optionalText('year', 'Year'),
    optionalText('industry', 'Industry'),
    optionalText('teamInvolvement', 'Team Involvement'),
    optionalText('servicesWeProvided', 'Services Provided'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
  ],
}

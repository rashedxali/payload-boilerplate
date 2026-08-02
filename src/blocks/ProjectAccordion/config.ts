import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalUpload } from '@/blocks/shared/fields'

export const ProjectAccordion: Block = {
  slug: 'projectAccordion',
  // Shorten DB identifiers — versioned services/our-work tables otherwise exceed Postgres' 63-char limit
  // e.g. enum__services_v_blocks_project_accordion_accordions_button_target
  dbName: 'projAcc',
  interfaceName: 'ProjectAccordionBlock',
  labels: { singular: 'Project Accordion', plural: 'Project Accordions' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'accordions',
      dbName: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('projectImage', 'Project Image'),
        buttonGroup('button'),
      ],
    },
  ],
}

import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AgencyIntro: Block = {
  slug: 'agencyIntro',
  interfaceName: 'AgencyIntroBlock',
  labels: {
    plural: 'Agency Intro Blocks',
    singular: 'Agency Intro Block',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Use line breaks to control how the heading wraps.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Body Content',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'No fluff. No guesswork. Just results.',
    },
    {
      name: 'button',
      type: 'group',
      admin: {
        description: 'Optional call-to-action button shown below the body content.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}

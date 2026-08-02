import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { layoutBlocks } from '../../blocks/layoutBlocks'
import { defaultLexical } from '@/fields/defaultLexical'
import { extendedSeoFields } from '@/fields/seo'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import {
  normalizeLayoutTitlesAfterRead,
  normalizeLayoutTitlesBeforeChange,
} from '@/hooks/normalizeLayoutTitles'

import {
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'contentMode',
              type: 'select',
              defaultValue: 'layout',
              options: [
                { label: 'Block layout', value: 'layout' },
                { label: 'Text page', value: 'text' },
              ],
              admin: {
                description: 'Use Text page for legal or simple content pages with no block layout.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: layoutBlocks,
              admin: {
                initCollapsed: true,
                condition: (_data, siblingData) => siblingData?.contentMode !== 'text',
              },
            },
            {
              name: 'body',
              type: 'richText',
              editor: defaultLexical,
              label: 'Body',
              admin: {
                description: 'Rich text content for text-only pages.',
                condition: (_data, siblingData) => siblingData?.contentMode === 'text',
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),

            MetaDescriptionField({}),
            ...extendedSeoFields(),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterRead: [normalizeLayoutTitlesAfterRead],
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt, normalizeLayoutTitlesBeforeChange],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

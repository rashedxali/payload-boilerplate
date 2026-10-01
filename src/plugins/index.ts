import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { verifyRecaptchaHook } from '@/hooks/verifyRecaptchaHook'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { defaultLexical } from '@/fields/defaultLexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Blog, Page } from '@/payload-types'
import { getDocumentURL } from '@/utilities/getDocumentURL'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Blog | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Blog | Page> = ({ collectionConfig, doc }) => {
  const collection = collectionConfig?.slug === 'blogs' ? 'blogs' : 'pages'
  const slug = typeof doc?.slug === 'string' ? doc.slug : null

  if (doc?.meta?.canonicalURL) {
    return doc.meta.canonicalURL
  }

  return slug ? getDocumentURL(slug, collection) : getServerSideURL()
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'blogs'],
    overrides: {
      admin: {
        group: 'Configuration',
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    redirectRelationships: ['pages'],
    formSubmissionOverrides: {
      hooks: {
        beforeValidate: [verifyRecaptchaHook],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: defaultLexical,
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['blogs', 'pages'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]

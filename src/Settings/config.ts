import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { analyticsProviderField } from './fields/analyticsProvider'
import { textFileControlField } from './fields/textFileControl'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  admin: {
    description:
      'Branding, contact, social, integrations, form and public content API controls, legal notices, and custom HTML.',
    group: 'Configuration',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'general',
              type: 'group',
              fields: [
                {
                  name: 'siteName',
                  type: 'text',
                  label: 'Site name',
                },
                {
                  name: 'tagline',
                  type: 'text',
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'favicon',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'contactEmail',
                  type: 'email',
                },
                {
                  name: 'contactPhone',
                  type: 'text',
                },
                {
                  name: 'address',
                  type: 'textarea',
                },
                {
                  name: 'socialLinks',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'X (Twitter)', value: 'x' },
                        { label: 'YouTube', value: 'youtube' },
                      ],
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'defaultTitleSuffix',
                  type: 'text',
                  defaultValue: '| Notionhive',
                  admin: {
                    description: 'Appended to page titles when no custom SEO title is set.',
                  },
                },
                {
                  name: 'defaultMetaDescription',
                  type: 'textarea',
                },
                {
                  name: 'defaultOgImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Default OG image',
                },
                {
                  name: 'organizationName',
                  type: 'text',
                  admin: {
                    description: 'Used for default organization schema markup.',
                  },
                },
                {
                  name: 'organizationUrl',
                  type: 'text',
                  admin: {
                    description: 'Primary website URL for organization schema markup.',
                  },
                },
                textFileControlField({
                  name: 'robotsTxt',
                  label: 'robots.txt',
                  description: 'Control the public /robots.txt file for the entire site.',
                  customContentDescription:
                    'Optional custom robots.txt content. Leave empty to use the default rules.',
                }),
                textFileControlField({
                  name: 'llmsTxt',
                  label: 'llms.txt',
                  description: 'Control the public /llms.txt file for LLM crawlers.',
                  customContentDescription:
                    'Optional custom llms.txt content. Leave empty to use a generated default.',
                }),
                {
                  name: 'sitemap',
                  type: 'group',
                  label: 'Sitemap',
                  admin: {
                    description:
                      'Enable or disable public sitemap access. Sitemaps continue to generate internally.',
                  },
                  fields: [
                    {
                      name: 'status',
                      type: 'radio',
                      defaultValue: 'enable',
                      options: [
                        {
                          label: 'Enable',
                          value: 'enable',
                        },
                        {
                          label: 'Disable',
                          value: 'disable',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'analyticsDescription',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/Settings/components/AnalyticsDescription#AnalyticsDescription',
                },
              },
            },
            analyticsProviderField({
              name: 'googleTagManager',
              label: 'Google Tag Manager',
              description: 'Load Google Tag Manager on the public site.',
              idLabel: 'Container ID',
              idPlaceholder: 'GTM-XXXXXXX',
              idDescription: 'Find this in Google Tag Manager under Admin → Container Settings.',
            }),
            analyticsProviderField({
              name: 'googleAnalytics4',
              label: 'Google Analytics 4',
              description: 'Load GA4 directly on the public site.',
              idLabel: 'Measurement ID',
              idPlaceholder: 'G-XXXXXXXXXX',
              idDescription: 'Find this in GA4 under Admin → Data Streams.',
            }),
            analyticsProviderField({
              name: 'facebookPixel',
              label: 'Facebook Pixel',
              description: 'Load Meta Pixel on the public site.',
              idLabel: 'Pixel ID',
              idPlaceholder: 'Numeric pixel ID',
              idDescription: 'Find this in Meta Events Manager under your pixel settings.',
            }),
            analyticsProviderField({
              name: 'microsoftClarity',
              label: 'Microsoft Clarity',
              description: 'Load Microsoft Clarity on the public site.',
              idLabel: 'Project ID',
              idPlaceholder: 'Clarity project ID',
              idDescription: 'Find this in Microsoft Clarity under Settings → Overview.',
            }),
          ],
        },
        {
          label: 'Maintenance',
          fields: [
            {
              name: 'maintenance',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Enable maintenance mode',
                },
                {
                  name: 'headline',
                  type: 'text',
                  defaultValue: 'We’ll be back soon',
                },
                {
                  name: 'message',
                  type: 'textarea',
                  admin: {
                    description: 'Message shown to visitors while maintenance mode is active.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Custom code',
          fields: [
            {
              name: 'customCode',
              type: 'group',
              fields: [
                {
                  name: 'headHtml',
                  type: 'textarea',
                  label: 'Head HTML',
                  admin: {
                    description: 'Injected before </head> on the public site.',
                    rows: 10,
                  },
                },
                {
                  name: 'bodyHtml',
                  type: 'textarea',
                  label: 'Body HTML',
                  admin: {
                    description: 'Injected before </body> on the public site.',
                    rows: 10,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}

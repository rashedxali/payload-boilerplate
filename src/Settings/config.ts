import type { FieldAccess, GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { analyticsProviderField } from './fields/analyticsProvider'
import { textFileControlField } from './fields/textFileControl'
import { revalidateSettings } from './hooks/revalidateSettings'

// The global is publicly readable, so secrets are restricted at field level.
const secretFieldAccess: FieldAccess = ({ req: { user } }) => Boolean(user)

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
                      'Enable or disable public sitemap access. When enabled, /sitemap.xml lists one child sitemap per frontend collection (pages, blogs).',
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
          label: 'Integrations',
          fields: [
            {
              name: 'integrations',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'group',
                  label: 'Email (Resend)',
                  admin: {
                    description:
                      'Leave a field empty to use its env variable. Without an API key and a from address no email is sent; form submissions are still recorded.',
                  },
                  fields: [
                    {
                      name: 'resendApiKey',
                      type: 'text',
                      label: 'Resend API key',
                      access: {
                        read: secretFieldAccess,
                        update: secretFieldAccess,
                      },
                      admin: {
                        description: 'Falls back to RESEND_API_KEY.',
                        placeholder: 're_xxxxxxxx',
                      },
                    },
                    {
                      name: 'fromAddress',
                      type: 'email',
                      label: 'From address',
                      admin: {
                        description: 'Falls back to EMAIL_FROM_ADDRESS.',
                      },
                    },
                    {
                      name: 'fromName',
                      type: 'text',
                      label: 'From name',
                      admin: {
                        description: 'Falls back to EMAIL_FROM_NAME.',
                      },
                    },
                  ],
                },
                {
                  name: 'recaptcha',
                  type: 'group',
                  label: 'Invisible reCAPTCHA (v2)',
                  admin: {
                    description:
                      'Leave a field empty to use its env variable. reCAPTCHA is disabled unless both the site key and the secret key are available.',
                  },
                  fields: [
                    {
                      name: 'siteKey',
                      type: 'text',
                      label: 'Site key',
                      admin: {
                        description: 'Falls back to NEXT_PUBLIC_RECAPTCHA_SITE_KEY.',
                      },
                    },
                    {
                      name: 'secretKey',
                      type: 'text',
                      label: 'Secret key',
                      access: {
                        read: secretFieldAccess,
                        update: secretFieldAccess,
                      },
                      admin: {
                        description: 'Falls back to RECAPTCHA_SECRET_KEY.',
                      },
                    },
                  ],
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

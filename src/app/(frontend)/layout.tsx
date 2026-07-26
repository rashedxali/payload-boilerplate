import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Analytics } from '@/components/Analytics'
import { CustomCodeBody, CustomCodeHead } from '@/components/CustomCode'
import { JsonLd } from '@/components/JsonLd'
import { MaintenanceMode } from '@/components/MaintenanceMode'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { buildOrganizationSchema } from '@/utilities/buildOrganizationSchema'
import { getPublicAnalyticsConfig } from '@/utilities/getAnalyticsConfig'
import { getSeoDefaults } from '@/utilities/getSeoDefaults'
import { getCachedSettings } from '@/utilities/getSettings'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const settings = await getCachedSettings()
  const isMaintenanceMode = Boolean(settings.maintenance?.enabled)
  const analyticsConfig = getPublicAnalyticsConfig(settings)
  const organizationSchema = buildOrganizationSchema(settings)

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      data-theme="light"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <CustomCodeHead html={settings.customCode?.headHtml} />
        {organizationSchema && <JsonLd data={JSON.stringify(organizationSchema)} />}
      </head>
      <body>
        <Analytics config={analyticsConfig} />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: draft,
            }}
          />

          {isMaintenanceMode ? (
            <MaintenanceMode
              contactEmail={settings.general?.contactEmail}
              headline={settings.maintenance?.headline}
              logo={settings.general?.logo}
              message={settings.maintenance?.message}
              siteName={settings.general?.siteName}
            />
          ) : (
            <>
              <Header />
              {children}
              <Footer />
            </>
          )}
        </Providers>
        <CustomCodeBody html={settings.customCode?.bodyHtml} />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoDefaults = await getSeoDefaults()

  return {
    metadataBase: new URL(getServerSideURL()),
    description: seoDefaults.defaultDescription,
    openGraph: mergeOpenGraph(undefined, seoDefaults),
    title: seoDefaults.siteName,
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
  }
}

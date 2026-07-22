'use client'

import type { UIFieldClientProps } from 'payload'

import { useMediaPreviewUrl } from '@/fields/seo/useMediaPreviewUrl'
import { getDocumentURL } from '@/utilities/getDocumentURL'
import {
  useAllFormFields,
  useConfig,
  useDocumentInfo,
  useDocumentTitle,
  useForm,
  useLocale,
  useTranslation,
} from '@payloadcms/ui'
import { reduceToSerializableFields } from '@payloadcms/ui/shared'
import { formatAdminURL } from 'payload/shared'
import React, { useEffect, useMemo, useState } from 'react'

function getFieldValue(fields: Record<string, { value?: unknown }>, path: string): unknown {
  return fields[path]?.value
}

function getPreviewText(value: unknown, fallback: unknown): string {
  if (typeof value === 'string' && value.trim()) {
    return value
  }

  if (typeof fallback === 'string' && fallback.trim()) {
    return fallback
  }

  return ''
}

export const SeoPreviewField: React.FC<UIFieldClientProps> = () => {
  const { t } = useTranslation()
  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig()
  const locale = useLocale()
  const [fields] = useAllFormFields()
  const { getData } = useForm()
  const docInfo = useDocumentInfo()
  const { title: documentTitle } = useDocumentTitle()

  const slug = typeof fields.slug?.value === 'string' ? fields.slug.value : null
  const canonicalOverride =
    typeof fields['meta.canonicalURL']?.value === 'string' ? fields['meta.canonicalURL'].value : ''
  const collection = docInfo.collectionSlug === 'posts' ? 'posts' : 'pages'

  const metaTitle = getFieldValue(fields, 'meta.title')
  const metaDescription = getFieldValue(fields, 'meta.description')
  const metaImage = getFieldValue(fields, 'meta.image')
  const ogTitle = getFieldValue(fields, 'meta.social.openGraph.title')
  const ogDescription = getFieldValue(fields, 'meta.social.openGraph.description')
  const ogImage = getFieldValue(fields, 'meta.social.openGraph.image')
  const twitterImage = getFieldValue(fields, 'meta.social.twitter.image')

  const formData = getData() as {
    meta?: {
      image?: unknown
      social?: {
        openGraph?: {
          image?: unknown
        }
        twitter?: {
          image?: unknown
        }
      }
    }
  }

  const initialData = docInfo.initialData as {
    meta?: {
      image?: unknown
      social?: {
        openGraph?: {
          image?: unknown
        }
        twitter?: {
          image?: unknown
        }
      }
    }
  } | null

  const previewImageCandidates = useMemo(
    () => [
      ogImage,
      formData?.meta?.social?.openGraph?.image,
      initialData?.meta?.social?.openGraph?.image,
      twitterImage,
      formData?.meta?.social?.twitter?.image,
      initialData?.meta?.social?.twitter?.image,
      metaImage,
      formData?.meta?.image,
      initialData?.meta?.image,
    ],
    [
      formData?.meta?.image,
      formData?.meta?.social?.openGraph?.image,
      formData?.meta?.social?.twitter?.image,
      initialData?.meta?.image,
      initialData?.meta?.social?.openGraph?.image,
      initialData?.meta?.social?.twitter?.image,
      metaImage,
      ogImage,
      twitterImage,
    ],
  )

  const previewImageUrl = useMediaPreviewUrl(previewImageCandidates, serverURL, api)

  const [generatedUrl, setGeneratedUrl] = useState<string>()

  const fallbackUrl = useMemo(
    () => getDocumentURL(slug, collection),
    [collection, slug],
  )

  const previewUrl = canonicalOverride.trim() || generatedUrl || fallbackUrl
  const previewDomain = useMemo(() => {
    try {
      return new URL(previewUrl).hostname.replace(/^www\./, '').toUpperCase()
    } catch {
      return 'YOURSITE.COM'
    }
  }, [previewUrl])

  const searchPreviewTitle =
    getPreviewText(metaTitle, documentTitle) ||
    (typeof documentTitle === 'string' && documentTitle) ||
    'Page title'
  const searchPreviewDescription =
    getPreviewText(metaDescription, null) || 'Meta description will appear here.'

  const socialPreviewTitle =
    getPreviewText(ogTitle, metaTitle) ||
    (typeof documentTitle === 'string' && documentTitle) ||
    'Page title'
  const socialPreviewDescription =
    getPreviewText(ogDescription, metaDescription) || 'Meta description will appear here.'

  useEffect(() => {
    const endpoint = formatAdminURL({
      apiRoute: api,
      path: '/plugin-seo/generate-url',
    })

    const getHref = async () => {
      const response = await fetch(endpoint, {
        body: JSON.stringify({
          id: docInfo.id,
          collectionSlug: docInfo.collectionSlug,
          doc: getData(),
          docPermissions: docInfo.docPermissions,
          globalSlug: docInfo.globalSlug,
          hasPublishPermission: docInfo.hasPublishPermission,
          hasSavePermission: docInfo.hasSavePermission,
          initialData: docInfo.initialData,
          initialState: reduceToSerializableFields(docInfo.initialState ?? {}),
          locale: typeof locale === 'object' ? locale?.code : locale,
          title: documentTitle,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { result } = await response.json()
      setGeneratedUrl(typeof result === 'string' ? result : fallbackUrl)
    }

    void getHref()
  }, [
    api,
    canonicalOverride,
    docInfo,
    documentTitle,
    fallbackUrl,
    getData,
    locale,
    slug,
  ])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div>Search result preview</div>
      <div style={{ color: '#9A9A9A', marginBottom: '12px' }}>
        {t('plugin-seo:previewDescription')}
      </div>

      <div
        style={{
          background: 'var(--theme-elevation-50)',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px',
          maxWidth: '600px',
          padding: '20px',
          pointerEvents: 'none',
          width: '100%',
        }}
      >
        <div style={{ color: '#137333', fontSize: '14px', marginBottom: '4px' }}>{previewUrl}</div>
        <h4 style={{ color: '#1a0dab', fontSize: '20px', margin: '0 0 8px' }}>{searchPreviewTitle}</h4>
        <p style={{ color: '#4d5156', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
          {searchPreviewDescription}
        </p>
      </div>

      <div>Social share preview</div>
      <div style={{ color: '#9A9A9A', marginBottom: '12px' }}>
        How a shared link appears on LinkedIn, Facebook, and X when Open Graph tags are set.
      </div>

      <div
        style={{
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
          maxWidth: '520px',
          overflow: 'hidden',
          pointerEvents: 'none',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            aspectRatio: '1200 / 630',
            background: 'var(--theme-elevation-100)',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {previewImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={previewImageUrl}
              style={{ display: 'block', height: '100%', objectFit: 'cover', width: '100%' }}
            />
          ) : (
            <span style={{ color: 'var(--theme-elevation-500)', fontSize: '13px' }}>
              OG image · 1200 x 630
            </span>
          )}
        </div>

        <div style={{ background: 'var(--theme-elevation-0)', padding: '14px 16px' }}>
          <div
            style={{
              color: 'var(--theme-elevation-500)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              marginBottom: '6px',
            }}
          >
            {previewDomain}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.35, marginBottom: '6px' }}>
            {socialPreviewTitle}
          </div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '13px', lineHeight: 1.5 }}>
            {socialPreviewDescription}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import type { TextFieldClientProps } from 'payload'

import { getDocumentURL } from '@/utilities/getDocumentURL'
import {
  FieldDescription,
  FieldLabel,
  TextInput,
  useAllFormFields,
  useDocumentInfo,
  useField,
} from '@payloadcms/ui'
import React, { useMemo } from 'react'

export const CanonicalUrlField: React.FC<TextFieldClientProps> = ({ field, path, readOnly }) => {
  const { setValue, showError, value } = useField<string>({ path })
  const docInfo = useDocumentInfo()
  const [fields] = useAllFormFields()

  const slug = typeof fields.slug?.value === 'string' ? fields.slug.value : null
  const collection = docInfo.collectionSlug === 'posts' ? 'posts' : 'pages'

  const defaultUrl = useMemo(
    () => getDocumentURL(slug, collection),
    [collection, slug],
  )

  const effectiveUrl = value?.trim() || defaultUrl

  return (
    <div className="field-type text">
      <FieldLabel htmlFor={`field-${path}`} label={field.label} required={field.required} />

      <TextInput
        onChange={setValue}
        path={path}
        placeholder={defaultUrl}
        readOnly={readOnly}
        value={typeof value === 'string' ? value : ''}
      />

      <FieldDescription
        description={
          value?.trim()
            ? `Override active. Public canonical URL: ${effectiveUrl}`
            : `Defaults to the current content URL: ${defaultUrl}`
        }
        path={path}
      />

      {showError && <div className="field-error">Enter a valid URL (including https://).</div>}
    </div>
  )
}

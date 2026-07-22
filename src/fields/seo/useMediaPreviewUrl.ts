'use client'

import { formatAdminURL } from 'payload/shared'
import { useEffect, useMemo, useState } from 'react'

import { getMediaPreviewUrl } from './getMediaPreviewUrl'

function getMediaId(value: unknown): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id

    if (typeof id === 'number' || typeof id === 'string') {
      return id
    }
  }

  return null
}

export function useMediaPreviewUrl(
  candidates: unknown[],
  serverURL: string,
  api: string,
): string | null {
  const candidateKey = useMemo(
    () => candidates.map((candidate) => getMediaId(candidate) ?? 'empty').join('|'),
    [candidates],
  )

  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const resolve = async () => {
      for (const candidate of candidates) {
        const directUrl = getMediaPreviewUrl(
          candidate as Parameters<typeof getMediaPreviewUrl>[0],
          serverURL,
        )

        if (directUrl) {
          if (!cancelled) {
            setUrl(directUrl)
          }

          return
        }
      }

      for (const candidate of candidates) {
        const id = getMediaId(candidate)

        if (!id) {
          continue
        }

        try {
          const endpoint = formatAdminURL({
            apiRoute: api,
            path: `/media/${id}`,
          })

          const response = await fetch(`${serverURL}${endpoint}?depth=0`, {
            credentials: 'include',
          })

          if (!response.ok) {
            continue
          }

          const doc = await response.json()
          const previewUrl = getMediaPreviewUrl(doc, serverURL)

          if (previewUrl) {
            if (!cancelled) {
              setUrl(previewUrl)
            }

            return
          }
        } catch {
          continue
        }
      }

      if (!cancelled) {
        setUrl(null)
      }
    }

    void resolve()

    return () => {
      cancelled = true
    }
  }, [api, candidateKey, candidates, serverURL])

  return url
}

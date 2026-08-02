import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim()
}

/** Convert legacy plain-text or HTML titles into headings-only Lexical state. */
export function stringToTitleLexical(
  value: string,
  tag: HeadingTag = 'h2',
): DefaultTypedEditorState {
  const text = stripHtml(value)

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag,
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      ],
      direction: 'ltr',
    },
  } as DefaultTypedEditorState
}

export function isLegacyTitleValue(value: unknown): value is string {
  return typeof value === 'string'
}

function isPopulatedDocument(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const obj = value as Record<string, unknown>

  // Layout blocks and form field blocks are not CMS documents.
  if ('blockType' in obj || 'blockName' in obj) return false

  // Lexical editor state — do not treat as a Payload document.
  if ('root' in obj && obj.root && typeof obj.root === 'object') return false

  return 'id' in obj && ('slug' in obj || 'createdAt' in obj || 'updatedAt' in obj)
}

export function normalizeTitleValue(value: unknown): unknown {
  if (isLegacyTitleValue(value)) {
    return stringToTitleLexical(value)
  }

  return value
}

/** Recursively upgrade legacy string `title` fields inside block/layout data. */
export function normalizeTitleFields<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeTitleFields(item)) as T
  }

  if (data && typeof data === 'object') {
    if (isPopulatedDocument(data)) {
      return data as T
    }

    const result = { ...(data as Record<string, unknown>) }

    for (const [key, value] of Object.entries(result)) {
      if (key === 'title') {
        result[key] = normalizeTitleValue(value)
      } else {
        result[key] = normalizeTitleFields(value)
      }
    }

    return result as T
  }

  return data
}

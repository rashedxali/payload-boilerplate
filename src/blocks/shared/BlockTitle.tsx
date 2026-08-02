import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'

type Props = {
  /** Block-specific styles. Target headings with `[&_h1]:`, `[&_h2]:`, etc. */
  className?: string
  data?: DefaultTypedEditorState | string | null
}

/** Renders headings-only rich text. The chosen h1–h4 tag is output as HTML; styling comes from the block. */
export function BlockTitle({ className, data }: Props) {
  if (!data) return null

  if (typeof data === 'string') {
    const text = data.replace(/<[^>]*>/g, '').trim()
    return (
      <div className={className}>
        <h2>{text}</h2>
      </div>
    )
  }

  return (
    <div className={className}>
      <RichText data={data} enableGutter={false} enableProse={false} />
    </div>
  )
}

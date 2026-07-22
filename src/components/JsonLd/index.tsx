import React from 'react'

type Props = {
  data?: string | null
}

export const JsonLd: React.FC<Props> = ({ data }) => {
  if (!data) return null

  try {
    JSON.parse(data)
  } catch {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: data }}
      type="application/ld+json"
    />
  )
}

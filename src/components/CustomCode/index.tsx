import React from 'react'

type Props = {
  html?: string | null
}

export const CustomCodeHead: React.FC<Props> = ({ html }) => {
  if (!html?.trim()) {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.currentScript.insertAdjacentHTML('beforebegin', ${JSON.stringify(html)});`,
      }}
      id="custom-head-code"
      suppressHydrationWarning
    />
  )
}

export const CustomCodeBody: React.FC<Props> = ({ html }) => {
  if (!html?.trim()) {
    return null
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />
}

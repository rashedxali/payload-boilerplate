import React from 'react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

export const Section: React.FC<{
  children: React.ReactNode
  className?: string
  id?: string
}> = ({ children, className, id }) => (
  <section id={id} className={cn('nh-section', className)}>
    <div className="container">{children}</div>
  </section>
)

export const NHButton: React.FC<{
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}> = ({ href, children, variant = 'primary', className }) => {
  if (!href) return null
  return (
    <Link
      href={href}
      className={cn(variant === 'primary' ? 'nh-btn-primary' : 'nh-btn-outline', className)}
    >
      {children}
    </Link>
  )
}

export const HtmlContent: React.FC<{ html?: string | null; className?: string }> = ({
  html,
  className,
}) => {
  if (!html) return null
  return (
    <div
      className={cn('prose prose-neutral max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export const MediaImage: React.FC<{
  resource?: number | MediaType | null
  className?: string
  imgClassName?: string
}> = ({ resource, className, imgClassName }) => {
  if (!resource) return null
  return (
    <Media
      resource={resource}
      className={className}
      imgClassName={cn('w-full h-auto object-cover', imgClassName)}
    />
  )
}

export function BracketHighlight({ text }: { text?: string | null }) {
  if (!text) return null
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span key={i} className="text-nh-blue">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
        ),
      )}
    </>
  )
}

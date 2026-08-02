'use client'

import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { getDocumentPath } from '@/utilities/getDocumentURL'
import { getPlainTextFromLexical } from '@/utilities/getPlainTextFromLexical'
import { MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const FeaturedBlogPostBlock: React.FC<AnyBlock> = (props) => {
  const post = props.post as { title?: string; slug?: string; heroImage?: number } | number
  if (!post || typeof post !== 'object') return null

  return (
    <Section>
      <FadeIn>
        <Link href={getDocumentPath(post.slug, 'blogs')} className="group grid gap-8 overflow-hidden rounded-2xl border border-black/10 lg:grid-cols-2">
          <MediaImage resource={post.heroImage as number} className="aspect-[16/10]" />
          <div className="flex flex-col justify-center p-8">
            <p className="mb-2 text-sm font-medium text-nh-blue">Featured</p>
            <h2 className="text-3xl group-hover:text-nh-blue">
              {getPlainTextFromLexical(post.title)}
            </h2>
          </div>
        </Link>
      </FadeIn>
    </Section>
  )
}

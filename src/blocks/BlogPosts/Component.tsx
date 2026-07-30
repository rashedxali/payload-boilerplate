'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const BlogPostsBlock: React.FC<AnyBlock> = () => (
  <Section>
    <FadeIn>
      <p className="text-black/60">Blog posts are loaded on the blog listing page.</p>
    </FadeIn>
  </Section>
)

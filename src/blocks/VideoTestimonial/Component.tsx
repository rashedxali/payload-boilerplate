'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const VideoTestimonialBlock: React.FC<AnyBlock> = (props) => {
  const videos = (props.videos as Array<{ videoUrl?: string; title?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <div className="aspect-video">
                <iframe
                  allowFullScreen
                  className="h-full w-full"
                  src={(video.videoUrl || '').replace('watch?v=', 'embed/')}
                  title={video.title || 'Video testimonial'}
                />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

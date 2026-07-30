'use client'

import React from 'react'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/utilities/ui'

export const FadeIn: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const { ref, inView } = useInView({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

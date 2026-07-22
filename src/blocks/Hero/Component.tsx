import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { HeroBlockClient } from './Component.client'

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  return <HeroBlockClient {...props} />
}

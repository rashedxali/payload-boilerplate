import type { Block } from 'payload'

import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/config'
import { ContactUsSection } from '@/blocks/ContactUsSection/config'
import { FeaturedBlogPost } from '@/blocks/FeaturedBlogPost/config'

/** All blocks available on collections with a `layout` field (pages) */
export const layoutBlocks: Block[] = [TestimonialsBlock, ContactUsSection, FeaturedBlogPost]

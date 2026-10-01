import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { ContactUsSectionBlock } from '@/blocks/ContactUsSection/Component'
import { FeaturedBlogPostBlock } from '@/blocks/FeaturedBlogPost/Component'

const blockComponents = {
  testimonialsBlock: TestimonialsBlock,
  contactUsSection: ContactUsSectionBlock,
  featuredBlogPost: FeaturedBlogPostBlock,
}

export type LayoutBlock = NonNullable<Page['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: LayoutBlock[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

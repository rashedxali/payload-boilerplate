import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'

import { createDocumentPage } from '../../_lib/createDocumentPage'
import PageClient from './page.client'

const blogPage = createDocumentPage({
  collection: 'blogs',
  render: (post) => (
    <article className="pt-16 pb-16">
      <PageClient />
      <PostHero post={post} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((relatedPost) => typeof relatedPost === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  ),
})

export const generateStaticParams = blogPage.generateStaticParams
export const generateMetadata = blogPage.generateMetadata
export default blogPage.Page

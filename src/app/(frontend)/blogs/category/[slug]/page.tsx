import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Media } from '@/components/Media'
import { FadeIn } from '@/components/FadeIn'
import { getDocumentPath } from '@/utilities/getDocumentURL'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function BlogCategoryPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const category = categoryResult.docs[0]
  if (!category) {
    return (
      <div className="container py-28">
        <h1>Category not found</h1>
      </div>
    )
  }

  const posts = await payload.find({
    collection: 'blogs',
    where: { categories: { contains: category.id } },
    sort: '-publishedAt',
    depth: 1,
  })

  return (
    <div className="pb-16 pt-28">
      <div className="container">
        <FadeIn>
          <h1 className="mb-4">{category.title}</h1>
          <p className="mb-10 text-black/60">{posts.totalDocs} articles</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post) => (
              <Link
                key={post.id}
                href={getDocumentPath(post.slug, 'blogs')}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                {post.heroImage && (
                  <Media resource={post.heroImage} className="aspect-[16/10]" />
                )}
                <div className="p-6">
                  <h2 className="text-xl group-hover:text-brand-primary">{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const categoryResult = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: slug } },
  })
  const category = categoryResult.docs[0]
  return { title: category ? `${category.title} | Blog` : 'Blog Category' }
}

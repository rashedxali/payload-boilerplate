import type { Block } from 'payload'

export const FeaturedBlogPost: Block = {
  slug: 'featuredBlogPost',
  interfaceName: 'FeaturedBlogPostBlock',
  labels: { singular: 'Featured Blog Post', plural: 'Featured Blog Posts' },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blogs',
    },
  ],
}

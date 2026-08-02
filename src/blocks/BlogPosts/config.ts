import type { Block } from 'payload'

export const BlogPosts: Block = {
  slug: 'blogPosts',
  interfaceName: 'BlogPostsBlock',
  admin: {
    disableBlockName: true,
  },
  labels: { singular: 'Blog Posts', plural: 'Blog Posts List' },
  fields: [
    {
      name: 'excludePosts',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
    },
  ],
}

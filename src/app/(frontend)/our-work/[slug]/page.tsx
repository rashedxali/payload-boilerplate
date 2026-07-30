import { RenderBlocks } from '@/blocks/RenderBlocks'

import { createDocumentPage } from '../../_lib/createDocumentPage'

const ourWorkPage = createDocumentPage({
  collection: 'our-work',
  render: (workItem) => <RenderBlocks blocks={workItem.layout || []} />,
})

export const generateStaticParams = ourWorkPage.generateStaticParams
export const generateMetadata = ourWorkPage.generateMetadata
export default ourWorkPage.Page

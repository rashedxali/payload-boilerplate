import { RenderBlocks } from '@/blocks/RenderBlocks'

import { createDocumentPage } from '../../_lib/createDocumentPage'

const servicePage = createDocumentPage({
  collection: 'services',
  render: (service) => <RenderBlocks blocks={service.layout || []} />,
})

export const generateStaticParams = servicePage.generateStaticParams
export const generateMetadata = servicePage.generateMetadata
export default servicePage.Page

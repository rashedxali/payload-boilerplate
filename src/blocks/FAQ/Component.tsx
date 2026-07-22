import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { FAQBlockClient } from './Component.client'

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  return <FAQBlockClient {...props} />
}

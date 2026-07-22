import type { Field } from 'payload'

import { canonicalUrlField } from './canonicalUrl'
import { jsonLdField } from './jsonLd'
import { seoPreviewField } from './previewField'
import { robotsField } from './robots'
import { socialSharingFields } from './socialSharing'

export const extendedSeoFields = (): Field[] => [
  canonicalUrlField(),
  robotsField(),
  jsonLdField(),
  socialSharingFields(),
  seoPreviewField(),
]

import type { Field } from 'payload'

import { canonicalUrlField } from './canonicalUrl'
import { jsonLdField } from './jsonLd'
import { robotsField } from './robots'

export const extendedSeoFields = (): Field[] => [
  canonicalUrlField(),
  robotsField(),
  jsonLdField(),
]

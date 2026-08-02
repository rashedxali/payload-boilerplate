import type { MessageField as MessageFieldType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'

import type { FormFieldComponentProps } from '../shared'
import { FieldWrapper } from '../shared'

export const MessageField: React.FC<FormFieldComponentProps & MessageFieldType> = ({ message }) => (
  <FieldWrapper>
    <RichText
      className="text-sm text-white/80"
      data={message as DefaultTypedEditorState}
      enableGutter={false}
      enableProse={false}
    />
  </FieldWrapper>
)

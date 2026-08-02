import type React from 'react'

import type { FormFieldComponentProps } from '../shared'
import { CheckboxField } from './CheckboxField'
import { EmailField } from './EmailField'
import { MessageField } from './MessageField'
import { NumberField } from './NumberField'
import { SelectField } from './SelectField'
import { TextField } from './TextField'
import { TextareaField } from './TextareaField'

type FormFieldComponent = React.FC<FormFieldComponentProps & Record<string, unknown>>

export const formFieldComponents: Record<string, FormFieldComponent> = {
  checkbox: CheckboxField as unknown as FormFieldComponent,
  country: TextField as unknown as FormFieldComponent,
  email: EmailField as unknown as FormFieldComponent,
  message: MessageField as unknown as FormFieldComponent,
  number: NumberField as unknown as FormFieldComponent,
  radio: SelectField as unknown as FormFieldComponent,
  select: SelectField as unknown as FormFieldComponent,
  state: TextField as unknown as FormFieldComponent,
  text: TextField as unknown as FormFieldComponent,
  textarea: TextareaField as unknown as FormFieldComponent,
}

export type { FormFieldComponentProps } from '../shared'

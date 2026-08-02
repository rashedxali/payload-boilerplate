import type { TextField as TextFieldType } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FormFieldComponentProps } from '../shared'
import { FieldError, FieldWrapper } from '../shared'

export const TextField: React.FC<FormFieldComponentProps & TextFieldType> = ({
  errors,
  label,
  name,
  register,
  required,
  width,
}) => (
  <FieldWrapper width={width}>
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </Label>
      <Input
        id={name}
        type="text"
        {...register(name, { required: required ? `${label} is required` : false })}
        className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
      />
      <FieldError message={errors[name]?.message as string | undefined} />
    </div>
  </FieldWrapper>
)

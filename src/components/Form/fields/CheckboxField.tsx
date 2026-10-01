import type { CheckboxField as CheckboxFieldType } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import type { FormFieldComponentProps } from '../shared'
import { FieldError, FieldWrapper } from '../shared'

export const CheckboxField: React.FC<FormFieldComponentProps & CheckboxFieldType> = ({
  control,
  errors,
  label,
  name,
  required,
  width,
}) => (
  <FieldWrapper width={width}>
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              id={name}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange(checked === true)}
              className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-brand-primary"
            />
            <Label htmlFor={name} className="text-white">
              {label}
              {required && <span className="text-red-400"> *</span>}
            </Label>
          </div>
        )}
      />
      <FieldError message={errors[name]?.message as string | undefined} />
    </div>
  </FieldWrapper>
)

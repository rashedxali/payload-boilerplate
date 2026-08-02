import type { SelectField as SelectFieldType } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { FormFieldComponentProps } from '../shared'
import { FieldError, FieldWrapper } from '../shared'

export const SelectField: React.FC<FormFieldComponentProps & SelectFieldType> = ({
  control,
  errors,
  label,
  name,
  options,
  placeholder,
  required,
  width,
}) => (
  <FieldWrapper width={width}>
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={typeof value === 'string' ? value : ''}>
            <SelectTrigger
              id={name}
              className="border-white/20 bg-white/10 text-white [&_svg]:text-white"
            >
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError message={errors[name]?.message as string | undefined} />
    </div>
  </FieldWrapper>
)

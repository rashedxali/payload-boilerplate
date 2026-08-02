import React from 'react'

import { cn } from '@/utilities/ui'

export type FormFieldComponentProps = {
  control: import('react-hook-form').Control<import('react-hook-form').FieldValues>
  errors: Partial<
    import('react-hook-form').FieldErrorsImpl<{
      [x: string]: unknown
    }>
  >
  register: import('react-hook-form').UseFormRegister<import('react-hook-form').FieldValues>
}

export const FieldWrapper: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | null
}> = ({ children, className, width }) => (
  <div
    className={cn('w-full', className)}
    style={width ? { flexBasis: `calc(${width}% - 0.5rem)` } : undefined}
  >
    {children}
  </div>
)

export const FieldError: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null
  return <p className="mt-1 text-sm text-red-400">{message}</p>
}

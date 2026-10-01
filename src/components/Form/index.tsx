'use client'

import type { Form } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { useRecaptcha } from '@/providers/Recaptcha'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import { buildInitialFormState } from './buildInitialFormState'
import { formFieldComponents } from './fields'

type FormValues = Record<string, unknown>

type Props = {
  className?: string
  form: Form
}

export const PayloadForm: React.FC<Props> = ({ className, form }) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    fields,
    redirect,
    submitButtonLabel,
  } = form

  const router = useRouter()
  const { execute: executeRecaptcha } = useRecaptcha()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: buildInitialFormState(fields as Parameters<typeof buildInitialFormState>[0]),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string>()

  const onSubmit = useCallback(
    (data: FormValues) => {
      const submit = async () => {
        setError(undefined)
        setIsLoading(true)

        const submissionData = Object.entries(data)
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([field, value]) => ({
            field,
            value: typeof value === 'boolean' ? String(value) : String(value),
          }))

        try {
          const recaptchaToken = await executeRecaptcha()

          const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData,
            }),
            headers: {
              'Content-Type': 'application/json',
              ...(recaptchaToken ? { 'x-recaptcha-token': recaptchaToken } : {}),
            },
            method: 'POST',
          })

          const result = await response.json()

          if (!response.ok) {
            setError(result.errors?.[0]?.message || 'Something went wrong. Please try again.')
            setIsLoading(false)
            return
          }

          setHasSubmitted(true)
          setIsLoading(false)

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch {
          setError('Something went wrong. Please try again.')
          setIsLoading(false)
        }
      }

      void submit()
    },
    [confirmationType, executeRecaptcha, formID, redirect?.url, router],
  )

  if (hasSubmitted && confirmationType === 'message') {
    return (
      <div className={cn('rounded-2xl border border-white/20 bg-white/10 p-6', className)}>
        {confirmationMessage ? (
          <RichText
            className="text-white"
            data={confirmationMessage as DefaultTypedEditorState}
            enableGutter={false}
            enableProse={false}
          />
        ) : (
          <p className="text-white">Thank you for your submission.</p>
        )}
      </div>
    )
  }

  return (
    <form className={cn('space-y-4', className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap gap-4">
        {fields?.map((field, index) => {
          const Field = formFieldComponents[field.blockType]

          if (!Field) return null

          return (
            <Field
              key={`${field.blockType}-${'name' in field ? field.name : index}`}
              {...field}
              control={control}
              errors={errors}
              register={register}
            />
          )
        })}
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="rounded-full bg-white px-6 text-nh-blue hover:bg-white/90"
      >
        {isLoading ? 'Sending...' : submitButtonLabel || 'Submit'}
      </Button>
    </form>
  )
}

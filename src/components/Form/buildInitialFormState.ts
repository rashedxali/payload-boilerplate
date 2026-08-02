import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

type FormFieldWithName = FormFieldBlock & { name?: string; defaultValue?: unknown }

export function buildInitialFormState(fields?: FormFieldBlock[] | null): Record<string, unknown> {
  if (!fields?.length) return {}

  return fields.reduce<Record<string, unknown>>((state, field) => {
    const namedField = field as FormFieldWithName
    if (!namedField.name) return state

    switch (namedField.blockType) {
      case 'checkbox':
        state[namedField.name] = namedField.defaultValue ?? false
        break
      default:
        state[namedField.name] = namedField.defaultValue ?? ''
        break
    }

    return state
  }, {})
}

import type { Field } from 'payload'

export const buttonGroup = (name = 'button'): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'text', type: 'text', label: 'Button Text' },
    { name: 'url', type: 'text', label: 'Button URL' },
  ],
})

export const optionalUpload = (name: string, label?: string): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label: label || name,
})

export const optionalText = (name: string, label?: string, multiline = false): Field =>
  multiline
    ? { name, type: 'textarea', label: label || name }
    : { name, type: 'text', label: label || name }

export const htmlField = (name: string, label?: string): Field => ({
  name,
  type: 'textarea',
  label: label || name,
  admin: { description: 'HTML content' },
})

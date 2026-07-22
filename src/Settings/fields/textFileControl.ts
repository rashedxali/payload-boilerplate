import type { GroupField } from 'payload'

type TextFileControlArgs = {
  customContentDescription: string
  description: string
  label: string
  name: string
  rows?: number
}

export const textFileControlField = ({
  customContentDescription,
  description,
  label,
  name,
  rows = 12,
}: TextFileControlArgs): GroupField => ({
  name,
  type: 'group',
  label,
  admin: {
    description,
  },
  fields: [
    {
      name: 'status',
      type: 'radio',
      defaultValue: 'disable',
      options: [
        {
          label: 'Enable',
          value: 'enable',
        },
        {
          label: 'Disable',
          value: 'disable',
        },
      ],
    },
    {
      name: 'customContent',
      type: 'textarea',
      label: 'Custom content',
      admin: {
        condition: (_, siblingData) => siblingData?.status === 'enable',
        description: customContentDescription,
        rows,
      },
    },
  ],
})

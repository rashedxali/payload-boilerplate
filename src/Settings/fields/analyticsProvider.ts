import type { GroupField } from 'payload'

type AnalyticsProviderFieldArgs = {
  description: string
  idDescription: string
  idLabel: string
  idPlaceholder: string
  name: string
  label: string
}

export const analyticsProviderField = ({
  description,
  idDescription,
  idLabel,
  idPlaceholder,
  label,
  name,
}: AnalyticsProviderFieldArgs): GroupField => ({
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
      name: 'id',
      type: 'text',
      label: idLabel,
      admin: {
        condition: (_, siblingData) => siblingData?.status === 'enable',
        description: idDescription,
        placeholder: idPlaceholder,
      },
    },
  ],
})

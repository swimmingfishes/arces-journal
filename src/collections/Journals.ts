import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const validateHexColor = (value: string | null | undefined) => {
  if (!value) return 'Color is required'
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value) || 'Use a valid HEX code, e.g. #FF5733'
}

export const Journals: CollectionConfig = {
  slug: 'journals',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'colors',
      type: 'group',
      label: 'Theme Colors',
      fields: [
        {
          name: 'primary',
          type: 'text',
          label: 'Primary Color',
          required: true,
          validate: validateHexColor,
          admin: {
            placeholder: '#1A73E8',
            description: 'Paste HEX code like #1A73E8',
          },
        },
        {
          name: 'secondary',
          type: 'text',
          label: 'Secondary Color',
          required: true,
          validate: validateHexColor,
          admin: {
            placeholder: '#34A853',
            description: 'Paste HEX code like #34A853',
          },
        },
        {
          name: 'accent',
          type: 'text',
          label: 'Accent Color',
          required: true,
          validate: validateHexColor,
          admin: {
            placeholder: '#FBBC04',
            description: 'Paste HEX code like #FBBC04',
          },
        },
      ],
    },
  ],
}

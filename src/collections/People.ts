import type { CollectionConfig } from 'payload'
import { COUNTRIES } from '@/lib/countries'

export const Peoples: CollectionConfig = {
  slug: 'peoples',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'instation',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country / Negara',
      options: COUNTRIES,
      required: true,
    },
    {
      name: 'role',
      type: 'relationship',
      label: 'Posisi',
      relationTo: 'roles',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Links', 
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

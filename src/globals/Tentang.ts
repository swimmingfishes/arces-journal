import type { GlobalConfig } from 'payload'

export const Tentang: GlobalConfig = {
  slug: 'tentang',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sejarah',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'Sejarah Content',
        },
      ],
    },
    {
      name: 'visiMisi',
      type: 'group',
      fields: [
        {
          name: 'visi',
          type: 'richText',
          required: true,
        },
        {
          name: 'misions',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'peranStrategis',
      type: 'group',
      fields: [
        {
          name: 'cards',
          type: 'array',
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
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'website',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'Website Content',
        },
      ],
    },
    {
      name: 'physicalAddress',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'Physical Address Content',
        },
        {
          name: 'mapsEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'Paste the embed URL from Google Maps iframe src attribute',
          },
        },
      ],
    },
  ],
}

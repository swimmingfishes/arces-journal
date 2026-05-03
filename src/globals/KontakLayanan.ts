import type { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'

export const KontakLayanan: GlobalConfig = {
  slug: 'kontakLayanan',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Kontak & Layanan',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'layanan',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Our Services',
          required: true,
        },
        {
          name: 'services',
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
            {
              name: 'iconType',
              type: 'select',
              options: ['Zap', 'ShieldCheck', 'MessageSquare'],
              required: true,
            },
          ],
          required: true,
          maxRows: 10,
        },
      ],
    },
    {
      name: 'kontak',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Contact Information',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          required: true,
        },
        {
          name: 'emailLabel',
          type: 'text',
          defaultValue: 'Email Editorial',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLabel',
          type: 'text',
          defaultValue: 'Office Location',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'phoneLabel',
          type: 'text',
          defaultValue: 'WhatsApp Support',
        },
        {
          name: 'mapsEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'Paste the embed URL from Google Maps iframe src attribute',
          },
        },
        {
          name: 'rightContent',
          type: 'richText',
          label: 'Right Column Content',
          admin: {
            description: 'Optional content for the right column of contact section',
          },
        },
      ],
    },
  ],
}

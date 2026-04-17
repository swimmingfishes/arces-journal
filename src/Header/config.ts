import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'ARCES',
      admin: {
        description: 'Brand text shown on the left side of the header.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'link',
          options: [
            {
              label: 'Home',
              value: 'house',
            },
            {
              label: 'Info',
              value: 'info',
            },
            {
              label: 'Team',
              value: 'users',
            },
            {
              label: 'News',
              value: 'news',
            },
            {
              label: 'Gallery',
              value: 'images',
            },
            {
              label: 'Contact',
              value: 'mailbox',
            },
            {
              label: 'Default Link',
              value: 'link',
            },
          ],
        },
      ],
      maxRows: 12,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

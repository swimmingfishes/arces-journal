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
          admin: {
            description: 'Fallback icon if iconName is empty or invalid.',
          },
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
        {
          name: 'iconName',
          type: 'text',
          admin: {
            description:
              'Optional manual Phosphor icon name, e.g. UsersThreeIcon. If valid, this overrides Icon dropdown.',
            placeholder: 'UsersThreeIcon',
          },
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

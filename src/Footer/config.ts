import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'ARCES',
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        rows: 4,
      },
    },
    {
      name: 'linkGroups',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'newsletterTitle',
      type: 'text',
      defaultValue: 'Newsletter',
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
      admin: {
        rows: 3,
      },
    },
    {
      name: 'bottomLinks',
      type: 'array',
      maxRows: 8,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '©{year} Arces. All rights reserved',
      admin: {
        description: 'Use {year} placeholder to render the current year automatically.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

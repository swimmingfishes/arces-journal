import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Page, News } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const generateTitle: GenerateTitle<News | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Arces News` : 'Arces News '
}

const generateURL: GenerateURL<News | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['news'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  vercelBlobStorage({
    enabled: hasBlobToken,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
    clientUploads: true,
  }),
]

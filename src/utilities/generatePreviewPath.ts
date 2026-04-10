import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap = {
  news: '/news',
} satisfies Partial<Record<CollectionSlug, string>>

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  const normalizedPath = `${collectionPrefixMap[collection]}/${slug}`.replace(/\/+/g, '/')

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: normalizedPath,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}

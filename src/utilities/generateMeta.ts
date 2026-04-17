import type { Metadata } from 'next'

import type { Media, Page, News, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<News> | null
  collection?: 'pages' | 'news'
}): Promise<Metadata> => {
  const { doc, collection } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || 'Arces Journal'

  const slugPath = (() => {
    if (Array.isArray(doc?.slug)) return doc.slug.join('/')
    if (typeof doc?.slug !== 'string' || !doc.slug) return ''

    if (collection === 'news') {
      return `news/${doc.slug}`
    }

    return doc.slug === 'home' ? '' : doc.slug
  })()

  const canonicalPath = slugPath ? `/${slugPath}` : '/'

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalPath,
    }),
    title,
  }
}

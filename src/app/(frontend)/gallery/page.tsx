import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { GalleryClient } from './GalleryClient'
import type { GalleryItem } from './types'

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })

  let galleryItems: GalleryItem[] = []

  try {
    const response = await payload.find({
      collection: 'media',
      depth: 1,
      limit: 200,
      sort: '-createdAt',
      where: {
        'folder.name': {
          equals: 'gallery',
        },
      },
    })

    galleryItems = (response.docs ?? []) as GalleryItem[]
  } catch (error) {
    console.error('Failed to fetch gallery items:', error)
    galleryItems = []
  }

  return <GalleryClient galleryItems={galleryItems} />
}

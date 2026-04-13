'use client'

import { useEffect, useMemo, useState } from 'react'
import { Media } from '@/components/Media'
import type { Media as PayloadMedia } from '@/payload-types'

type MediaResponse = {
  docs?: PayloadMedia[]
}

export function LandingGallery() {
  const [galleryImages, setGalleryImages] = useState<PayloadMedia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          '/api/media?depth=1&limit=30&sort=-createdAt&where[folder.name][equals]=gallery',
        )

        if (!response.ok) {
          throw new Error('Failed to fetch gallery media')
        }

        const data: MediaResponse = await response.json()

        if (active) {
          setGalleryImages(data.docs ?? [])
        }
      } catch {
        if (active) {
          setGalleryImages([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchGalleryImages()

    return () => {
      active = false
    }
  }, [])

  const mainImage = galleryImages[0]
  const sideImages = useMemo(() => galleryImages.slice(1, 7), [galleryImages])

  return (
    <section className="w-full px-6 lg:px-46 bg-background">
      <div className="mx-auto md:border-x border-gray-200 dark:border-white/10">
        {/* Header Section */}
        <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-blue-500">Media & Galery</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {loading && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
              Loading gallery...
            </div>
          )}

          {!loading && !mainImage && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
              No media found in gallery folder.
            </div>
          )}

          {/* LEFT: Featured Image & Description */}
          {mainImage && (
            <div className="flex flex-col border-b lg:border-b-0 border-l border-r md:border-l-0 lg:border-r border-gray-200 dark:border-white/10 group">
              <div className="relative w-full aspect-video bg-gray-200 dark:bg-zinc-900 overflow-hidden">
                <Media
                  resource={mainImage}
                  fill
                  size="50vw"
                  className="w-full h-full"
                  pictureClassName="relative block w-full h-full"
                  imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mainImage.alt || 'Featured gallery image from ARCES media collection.'}
                </p>
              </div>
            </div>
          )}

          {/* RIGHT: 6 Small Images Grid (3x2) */}
          <div className="grid grid-cols-2 lg:grid-cols-2 border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
            {sideImages.map((img, index) => (
              <div
                key={img.id}
                className={`aspect-video bg-gray-300 overflow-hidden border-b border-gray-200 dark:border-white/10 
                ${index % 2 === 0 ? 'border-r' : ''} 
                hover:opacity-80 transition-opacity cursor-pointer`}
              >
                <Media
                  resource={img}
                  fill
                  size="25vw"
                  className="w-full h-full"
                  pictureClassName="relative block w-full h-full"
                  imgClassName="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

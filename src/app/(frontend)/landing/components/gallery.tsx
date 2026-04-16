'use client'

import { useMemo } from 'react'
import { Media } from '@/components/Media'
import type { Media as PayloadMedia } from '@/payload-types'
import { useCollectionFetch } from '../useCollectionFetch'

export function LandingGallery() {
  const { data: galleryImages, loading } = useCollectionFetch<PayloadMedia>(
    '/api/media?depth=1&limit=30&sort=-createdAt&where[folder.name][equals]=gallery',
  )

  const mainImage = galleryImages[0]
  const sideImages = useMemo(() => galleryImages.slice(1, 7), [galleryImages])

  return (
    <section className="w-full bg-background p-8">
      <div className="border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 -m-[0.5px]">
          {/* MAIN IMAGE */}
          {mainImage && (
            <div className="group relative border border-border -m-[0.5px] overflow-hidden">
              <div className="relative w-full aspect-video">
                <Media
                  resource={mainImage}
                  fill
                  size="50vw"
                  className="w-full h-full"
                  pictureClassName="relative block w-full h-full"
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition" />

                {/* text overlay */}
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-sm opacity-80">{mainImage.alt || 'Featured gallery image'}</p>
                </div>
              </div>
            </div>
          )}

          {/* SIDE GRID */}
          <div className="grid grid-cols-2 -m-[0.5px]">
            {sideImages.map((img) => (
              <div
                key={img.id}
                className="group relative border border-border -m-[0.5px] overflow-hidden cursor-pointer"
              >
                <div className="relative w-full aspect-video">
                  <Media
                    resource={img}
                    fill
                    size="25vw"
                    className="w-full h-full"
                    pictureClassName="relative block w-full h-full"
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

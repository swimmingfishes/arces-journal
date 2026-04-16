'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { Media } from '@/components/Media'
import type { Media as PayloadMedia } from '@/payload-types'
import { useCollectionFetch } from '../useCollectionFetch'
import { LandingGallerySkeleton } from './skeletons/gallery-skeleton'

export function LandingGallery() {
  const { data: galleryImages, loading } = useCollectionFetch<PayloadMedia>(
    '/api/media?depth=1&limit=2&sort=-createdAt&where[folder.name][equals]=gallery',
  )

  const mainImage = galleryImages[0]
  const sideImage = galleryImages[1]

  if (true) {
    return <LandingGallerySkeleton />
  }

  if (!loading && galleryImages.length === 0) {
    return (
      <div className="w-full p-8 text-center text-sm text-muted-foreground bg-background">
        No gallery images found.
      </div>
    )
  }

  return (
    <section className="w-full bg-background p-8">
      <div className="border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 -m-[0.5px]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-sm opacity-80">{mainImage.alt || 'Featured gallery image'}</p>
                </div>
              </div>
            </div>
          )}

          <div className={`grid ${sideImage ? 'grid-cols-2' : 'grid-cols-1'} -m-[0.5px]`}>
            {sideImage && (
              <div className="group relative border border-border -m-[0.5px] overflow-hidden cursor-pointer">
                <div className="absolute inset-0">
                  <Media
                    resource={sideImage}
                    fill
                    size="25vw"
                    className="w-full h-full"
                    pictureClassName="relative block w-full h-full"
                    imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              </div>
            )}

            <Link
              href="/gallery"
              className="group relative border border-border -m-[0.5px] flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/50 transition-colors w-full h-full min-h-50"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ArrowRightIcon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors text-center">
                Lihat Semua
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

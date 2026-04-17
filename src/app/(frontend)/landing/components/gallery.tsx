'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { Media } from '@/components/Media'
import type { Media as PayloadMedia } from '@/payload-types'
import { useCollectionFetch } from '../useCollectionFetch'
import { LandingGallerySkeleton } from './skeletons/gallery-skeleton'
import { SectionDivider } from '@/components/SectionDivider'

export function LandingGallery() {
  const { data: galleryImages, loading } = useCollectionFetch<PayloadMedia>(
    '/api/media?depth=1&limit=2&sort=-createdAt&where[folder.name][equals]=gallery',
  )

  const mainImage = galleryImages[0]
  const sideImage = galleryImages[1]

  if (loading) {
    return (
      <>
        <SectionDivider title="Gallery" />
        <LandingGallerySkeleton />
      </>
    )
  }

  if (!loading && galleryImages.length === 0) {
    return null
  }

  return (
    <>
      <SectionDivider title="Gallery" />
      <section className="w-full bg-background p-8">
        <div className="border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-y-0 divide-x-0 lg:divide-x divide-y">
            {mainImage && (
              <div className="group relative overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Media
                    resource={mainImage}
                    fill
                    size="50vw"
                    className="w-full h-full"
                    pictureClassName="relative block w-full h-full"
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <p className="text-sm opacity-80">
                      {mainImage.alt || 'Featured gallery image'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={`grid divide-x ${sideImage ? 'grid-cols-2' : 'grid-cols-1 '} `}>
              {sideImage && (
                <div className="group relative overflow-hidden cursor-pointer">
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
                className="group relative flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/50 transition-colors w-full h-full min-h-50"
              >
                <div className="w-11 h-11 rounded-none bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                  <ArrowRightIcon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors text-center">
                  Lihat Semua
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

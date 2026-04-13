'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Media as PayloadMedia } from '@/payload-types'
import { Media } from '@/components/Media'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type MediaResponse = {
  docs?: PayloadMedia[]
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<PayloadMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  useEffect(() => {
    let active = true

    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(
          '/api/media?depth=1&limit=200&sort=-createdAt&where[folder.name][equals]=gallery',
        )

        if (!response.ok) {
          throw new Error('Failed to fetch gallery media')
        }

        const data: MediaResponse = await response.json()

        if (active) {
          setGalleryItems(data.docs ?? [])
        }
      } catch {
        if (active) {
          setGalleryItems([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchGalleryItems()

    return () => {
      active = false
    }
  }, [])

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / itemsPerPage))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return galleryItems.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, galleryItems])

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x  min-h-screen">
          {/* 1. TOP BAR: Back Button */}
          <div className="px-8 pt-10 ">
            <Link href="/">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2 ">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. TITLE SECTION */}
          <div className="px-8 py-8 border-b border-gray-200 dark:border-white/10 mt-4">
            <h1 className="text-4xl font-extrabold tracking-tight">Media & Gallery</h1>
          </div>

          {/* 4. GALLERY GRID (3 Kolom, Inset 3/4, dengan Pagination) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {loading && (
              <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
                Loading gallery...
              </div>
            )}

            {!loading && currentItems.length === 0 && (
              <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
                No media found in gallery folder.
              </div>
            )}

            {currentItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={`flex flex-col border-b border-gray-200 dark:border-white/10 
        border-l border-r md:border-l-0 
        ${(index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'} 
        hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all group`}
                >
                  {/* Wrapper Konten dengan Padding p-8 */}
                  <div className="p-8 flex flex-col h-full">
                    {/* Image: Inset Style dengan Rasio 3/4 */}
                    <div className="relative w-full aspect-video bg-gray-100 dark:bg-zinc-900 overflow-hidden mb-6 ">
                      <Media
                        resource={item}
                        fill
                        size="33vw"
                        className="w-full h-full"
                        pictureClassName="relative block w-full h-full"
                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Caption: Di bawah gambar, Center Aligned sesuai keinginanmu */}
                    <div className="space-y-2 mt-auto px-2">
                      <p className="text-sm text-center text-muted-foreground line-clamp-3 italic leading-relaxed">
                        {item.alt ||
                          item.filename ||
                          'Aktivitas penelitian atau pengabdian masyarakat di lapangan.'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 5. PAGINATION SECTION (Masuk ke dalam sistem border) */}
          <div className="py-4 flex justify-center bg-zinc-50/30 dark:bg-transparent">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  )
}

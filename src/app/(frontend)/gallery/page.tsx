'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
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
        if (!response.ok) throw new Error('Failed to fetch gallery media')
        const data: MediaResponse = await response.json()
        if (active) setGalleryItems(data.docs ?? [])
      } catch {
        if (active) setGalleryItems([])
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchGalleryItems()
    return () => {
      active = false
    }
  }, [])

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / itemsPerPage))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return galleryItems.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, galleryItems])

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x min-h-screen">
          {/* 1 & 2. HEADER SECTION: Center Aligned (No Back Button) */}
          <div className="px-8 py-16 border-b border-gray-200 dark:border-white/10 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tighter uppercase mb-4">
              ARCES GALLERY
            </h1>
            <p className="max-w-2xl text-muted-foreground leading-relaxed">
              Were a team of engineers, marketers, designers, all passionate about video and the
              work we create together. Welcome to our blog about video.
            </p>
          </div>

          {/* 3. GALLERY GRID: Full-Bleed (Mepet Border) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full px-8 py-10 text-center text-sm text-muted-foreground border-b border-gray-200 dark:border-white/10">
                Loading gallery...
              </div>
            ) : currentItems.length === 0 ? (
              <div className="col-span-full px-8 py-10 text-center text-sm text-muted-foreground border-b border-gray-200 dark:border-white/10">
                No media found in gallery folder.
              </div>
            ) : (
              currentItems.map((item, index) => {
                const totalInPage = currentItems.length
                const remainder = totalInPage % 3
                const itemsInLastRow = remainder === 0 ? 3 : remainder
                const isLastRow = index >= totalInPage - itemsInLastRow

                return (
                  <div
                    key={item.id}
                    className={`flex flex-col border-gray-200 dark:border-white/10
                      ${!isLastRow ? 'border-b' : ''} 
                      ${(index + 1) % 3 !== 0 ? 'lg:border-r' : ''} 
                      hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all group`}
                  >
                    {/* Image: Full-Bleed (Hapus Padding p-8) */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-zinc-900 overflow-hidden">
                      <Media
                        resource={item}
                        fill
                        size="33vw"
                        className="w-full h-full"
                        pictureClassName="relative block w-full h-full"
                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Caption: Berada di bawah garis border gambar */}
                    <div className="p-6 border-t border-gray-200 dark:border-white/10">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.alt ||
                          item.filename ||
                          'Aktivitas penelitian atau pengabdian masyarakat.'}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* 4. PAGINATION */}
          <div className="md:border-t border-gray-200 dark:border-white/10 py-8 flex justify-center bg-zinc-50/30 dark:bg-transparent">
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

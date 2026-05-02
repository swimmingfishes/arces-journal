'use client'

import { useMemo, useState } from 'react'
import { SectionDivider } from '@/components/SectionDivider'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import GalleryGrid from './components/gallerygrid'
import Paginations from './components/paginations'
import { GALLERY_ITEMS_PER_PAGE, type GalleryItem } from './types'

interface GalleryClientProps {
  galleryItems: GalleryItem[]
}

export function GalleryClient({ galleryItems }: GalleryClientProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / GALLERY_ITEMS_PER_PAGE))

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * GALLERY_ITEMS_PER_PAGE
    const indexOfFirstItem = indexOfLastItem - GALLERY_ITEMS_PER_PAGE
    return galleryItems.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, galleryItems])

  if (currentPage > totalPages) {
    return null
  }

  return (
    <main className="w-full divide-y">
      <RoutePageHeader
        title="Arces — Gallery"
        description="We're a team of engineers, marketers, designers, all passionate about video and the work we create together. Welcome to our blog about video."
      />
      <SectionDivider title="Gallery" />
      <GalleryGrid loading={false} items={currentItems} />
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}

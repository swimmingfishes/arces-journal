'use client'

import { useEffect, useMemo, useState } from 'react'
import { SectionDivider } from '@/components/SectionDivider'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import GalleryGrid from './components/gallerygrid'
import Paginations from './components/paginations'
import {
  GALLERY_ITEMS_PER_PAGE,
  GALLERY_MEDIA_ENDPOINT,
  type GalleryItem,
  type MediaResponse,
} from './types'

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let active = true
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(GALLERY_MEDIA_ENDPOINT)
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

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / GALLERY_ITEMS_PER_PAGE))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * GALLERY_ITEMS_PER_PAGE
    const indexOfFirstItem = indexOfLastItem - GALLERY_ITEMS_PER_PAGE
    return galleryItems.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, galleryItems])

  return (
    <main className="w-full divide-y">
      <RoutePageHeader
        title="Arces — Gallery"
        description="We're a team of engineers, marketers, designers, all passionate about video and the work we create together. Welcome to our blog about video."
      />
      <SectionDivider title="Gallery" />
      <GalleryGrid loading={loading} items={currentItems} />
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}

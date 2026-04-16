import type { Media as PayloadMedia } from '@/payload-types'

export type GalleryItem = PayloadMedia

export type MediaResponse = {
  docs?: GalleryItem[]
}

export type GalleryGridProps = {
  items: GalleryItem[]
  loading: boolean
}

export type GalleryPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const GALLERY_ITEMS_PER_PAGE = 6
export const GALLERY_MEDIA_ENDPOINT =
  '/api/media?depth=1&limit=200&sort=-createdAt&where[folder.name][equals]=gallery'

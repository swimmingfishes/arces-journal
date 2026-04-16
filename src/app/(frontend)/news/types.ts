import type { Media } from '@/payload-types'

export type SortOrder = 'newest' | 'oldest'

export type NewsItem = {
  id: string | number
  slug: string
  title: string
  createdAt?: string
  heroImage?: number | Media | null
  meta?: {
    description?: string | null
  }
}

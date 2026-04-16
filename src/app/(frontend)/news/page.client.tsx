'use client'

import { useMemo, useState } from 'react'
import { NewsList } from './components/listnews'
import { SearchNewsBar } from './components/search'
import type { NewsItem, SortOrder } from './types'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type NewsPageClientProps = {
  initialNews: NewsItem[]
  currentPage: number
  totalPages: number
}

export default function NewsPageClient({
  initialNews,
  currentPage,
  totalPages,
}: NewsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  const sortedNews = useMemo(() => {
    return [...initialNews].sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime()
      const dateB = new Date(b.createdAt ?? 0).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
  }, [initialNews, sortOrder])

  return (
    <div className="flex flex-col grow divide-y">
      <RoutePageHeader
        title="Arces — News"
        description="Temukan informasi terbaru seputar publikasi ilmiah, kegiatan penelitian, dan berbagai agenda akademik."
      />
      <SearchNewsBar
        allNews={initialNews}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        onSearchQueryChange={setSearchQuery}
        onSortOrderChange={setSortOrder}
      />
      <NewsList newsItems={sortedNews} />
      <div className="py-12 flex justify-center bg-zinc-50/30 dark:bg-transparent">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
                className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={pageNumber === 1 ? '/news' : `/news?page=${pageNumber}`}
                  isActive={currentPage === pageNumber}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
                className={
                  currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

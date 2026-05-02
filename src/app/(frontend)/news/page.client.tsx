'use client'

import { useMemo, useState } from 'react'
import { NewsList } from './components/listnews'
import { SearchNewsBar } from './components/search'
import type { NewsItem, SortOrder } from './types'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import Paginations from './components/paginations'

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
    <div className="flex min-h-screen flex-col divide-y">
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
      <Paginations currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

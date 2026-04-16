'use client'

import { useMemo, useState } from 'react'
import { CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { NewsItem, SortOrder } from '../types'
import { Skeleton } from '@/components/ui/skeleton'

type SearchNewsBarProps = {
  allNews: NewsItem[]
  searchQuery: string
  sortOrder: SortOrder
  onSearchQueryChange: (value: string) => void
  onSortOrderChange: (value: SortOrder) => void
  loading?: boolean
}

export function SearchNewsBar({
  allNews,
  searchQuery,
  sortOrder,
  onSearchQueryChange,
  onSortOrderChange,
  loading,
}: SearchNewsBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []
    return allNews.filter((news) => news.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [allNews, searchQuery])

  if (loading) {
    return (
      <div className="border-b border-border relative md:flex">
        <div className="relative flex items-center px-8 py-6 md:flex-1 md:border-r border-border">
          <Skeleton className="w-full h-14 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
        <div className="flex items-center justify-start px-8 py-6 md:w-80 md:shrink-0">
          <Skeleton className="h-14 w-full rounded-none bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    )
  }

  return (
    <div className="border-b border-border relative md:flex">
      <div className="relative flex items-center px-8 py-6 md:flex-1 md:border-r border-border group">
        <MagnifyingGlassIcon className="absolute left-12 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Cari berita atau aktivitas..."
          className="w-full rounded-full border border-border bg-white/70 dark:bg-zinc-900/70 pl-12 pr-4 h-14 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />

        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-border z-100 shadow-2xl max-h-80 overflow-y-auto">
            {searchResults.map((result) => (
              <Link key={result.id} href={`/news/${result.slug}`}>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 border-b last:border-0 border-border/70 flex items-center gap-4">
                  <div className="text-sm font-bold">{result.title}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-start px-8 py-6 bg-zinc-50/30 dark:bg-zinc-900/10 md:w-80 md:shrink-0">
        <div className="relative w-full">
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
            className="h-14 w-full appearance-none border border-border rounded-none bg-[#efd45c] text-gray-900 dark:bg-[#f3d562] dark:text-zinc-950 pl-4 pr-11 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
          <CaretDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900/80" />
        </div>
      </div>
    </div>
  )
}

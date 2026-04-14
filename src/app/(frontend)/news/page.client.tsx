'use client'

import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export default function NewsPageClient({ initialNews }: { initialNews: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const sortedNews = useMemo(() => {
    return [...initialNews].sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime()
      const dateB = new Date(b.createdAt ?? 0).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
  }, [initialNews, sortOrder])

  // Logika Search
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []
    return sortedNews.filter((news) => news.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedNews])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return ''

    const target = new Date(dateString).getTime()
    const now = Date.now()
    const diffMs = Math.max(0, now - target)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 30) return `${Math.max(1, diffDays)} hari lalu`

    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths < 12) return `${diffMonths} bulan lalu`

    const diffYears = Math.floor(diffMonths / 12)
    return `${diffYears} tahun lalu`
  }

  return (
    <div className="flex flex-col grow">
      {/* --- SEARCH & SORT SECTION --- */}
      <div className="border-b border-border relative md:flex">
        <div className="relative flex items-center px-8 py-6 md:flex-1 md:border-r border-border group">
          <Search className="absolute left-12 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Cari berita atau aktivitas..."
            className="w-full rounded-full border border-border bg-white/70 dark:bg-zinc-900/70 pl-12 pr-4 h-14 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-border z-100 shadow-2xl max-h-80 overflow-y-auto">
              {searchResults.map((result: any) => (
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
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="h-14 w-full border border-border rounded-none bg-[#efd45c] text-gray-900 dark:bg-[#f3d562] dark:text-zinc-950 px-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
            aria-label="Sort news"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
        </div>
      </div>

      {/* --- LIST NEWS (Row Style) --- */}
      <div className="flex flex-col grow">
        {sortedNews.map((news) => (
          <Link key={news.id} href={`/news/${news.slug}`}>
            <div className="group flex flex-col md:flex-row items-start gap-8 px-8 py-8 lg:py-10 border-b border-border hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-all">
              {/* KIRI: Gambar (Sejajar dengan teks) */}
              <div className="w-full md:w-64 lg:w-72 shrink-0">
                <div className="relative aspect-video overflow-hidden border border-border bg-gray-100 dark:bg-zinc-900">
                  <Media
                    resource={news.heroImage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* KANAN: Konten Teks */}
              <div className="flex flex-col justify-start grow space-y-4">
                <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                  {formatDate(news.createdAt)}{' '}
                  {formatDate(news.createdAt) && formatRelativeTime(news.createdAt) ? ' - ' : ''}
                  {formatRelativeTime(news.createdAt)}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {news.meta?.description || 'No description available'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

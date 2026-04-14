'use client'

import React, { useState, useMemo } from 'react'
import { Search, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export default function NewsPageClient({ initialNews }: { initialNews: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Logika Search
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []
    return initialNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, initialNews])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="flex flex-col grow">
      {/* --- SEARCH & FILTER SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 dark:border-white/10 relative">
        <div className="relative flex items-center px-8 py-6 md:border-r border-gray-200 dark:border-white/10 group">
          <Search className="absolute left-12 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Cari berita atau aktivitas..."
            className="w-full bg-transparent pl-12 pr-4 py-2 text-lg focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 z-[100] shadow-2xl max-h-80 overflow-y-auto">
              {searchResults.map((result: any) => (
                <Link key={result.id} href={`/news/${result.slug}`}>
                  <div className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 border-b last:border-0 border-gray-100 dark:border-white/5 flex items-center gap-4">
                    <div className="text-sm font-bold">{result.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-8 py-6 bg-zinc-50/30 dark:bg-zinc-900/10">
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Filter:
          </span>
          <select className="bg-transparent text-sm font-bold text-blue-600 focus:outline-none cursor-pointer">
            <option>Semua Kategori</option>
            <option>Riset</option>
            <option>Akademik</option>
          </select>
        </div>
      </div>

      {/* --- LIST NEWS (Row Style) --- */}
      <div className="flex flex-col grow">
        {initialNews.map((news, index) => (
          <Link key={news.id} href={`/news/${news.slug}`}>
            <div className="group flex flex-col md:flex-row gap-8 p-8 lg:p-12 border-b border-gray-200 dark:border-white/10 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-all">
              {/* KIRI: Gambar (Sejajar dengan teks) */}
              <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
                  <Media
                    resource={news.heroImage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* KANAN: Konten Teks */}
              <div className="flex flex-col justify-center grow space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-tighter">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(news.createdAt)}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.1] group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-2 text-justify">
                  {news.meta?.description || 'No description available'}
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-blue-600">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

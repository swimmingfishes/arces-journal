'use client'

import Link from 'next/link'
import { Media } from '@/components/Media'
import type { NewsItem } from '../types'

type NewsListProps = {
  newsItems: NewsItem[]
}

export function NewsList({ newsItems }: NewsListProps) {
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
    <div className="flex flex-col grow divide-y">
      {newsItems.map((news) => (
        <Link key={news.id} href={`/news/${news.slug}`}>
          <div className="group flex flex-col md:flex-row items-start gap-8 px-8 py-8 lg:py-10 hover:bg-white dark:hover:bg-zinc-900/70 transition-colors duration-300 motion-reduce:transition-none">
            {/* KIRI: Gambar (Sejajar dengan teks) */}
            <div className="w-full md:w-64 lg:w-72 shrink-0">
              <div className="relative aspect-video overflow-hidden border border-border bg-gray-100 dark:bg-zinc-900">
                <Media
                  resource={news.heroImage}
                  fill
                  className="relative block h-full w-full"
                  pictureClassName="block h-full w-full"
                  imgClassName="object-cover transition-all duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none group-hover:scale-[1.04] group-hover:brightness-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-black/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>

            {/* KANAN: Konten Teks */}
            <div className="flex flex-col justify-start grow space-y-3">
              <p className="text-xs font-mono md:text-xs uppercase tracking-wide text-yellow-800 dark:text-gray-400">
                {formatDate(news.createdAt)}{' '}
                {formatDate(news.createdAt) && formatRelativeTime(news.createdAt) ? ' - ' : ''}
                {formatRelativeTime(news.createdAt)}
              </p>
              <h2 className="text-3xl md:text-3xl font-bold font-serif leading-tight text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300 underline decoration-transparent underline-offset-6 group-hover:decoration-black dark:group-hover:decoration-white motion-reduce:decoration-transparent">
                {news.title}
              </h2>
              <p className="text-base leading-normal text-gray-700 dark:text-gray-300 line-clamp-2">
                {news.meta?.description || 'No description available'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

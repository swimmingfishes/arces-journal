'use client'

import Link from 'next/link'
import { NewspaperIcon } from '@phosphor-icons/react'
import { Media } from '@/components/Media'
import type { NewsItem } from '../types'
import { NewsListSkeleton } from './skeletons/news-list-skeleton'

type NewsListProps = {
  newsItems: NewsItem[]
  loading?: boolean
}

export function NewsList({ newsItems, loading }: NewsListProps) {
  if (loading) {
    return <NewsListSkeleton />
  }

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
          <div className="group flex flex-col md:flex-row items-start gap-8 px-8 py-8 lg:py-10 hover:bg-white dark:hover:bg-zinc-900/70 transition-colors duration-300">
            <div className="w-full md:w-64 lg:w-72 shrink-0">
              <div className="relative aspect-video overflow-hidden border border-border bg-gray-100 dark:bg-zinc-900">
                {news.heroImage ? (
                  <Media
                    resource={news.heroImage}
                    fill
                    className="relative block h-full w-full"
                    pictureClassName="block h-full w-full"
                    imgClassName="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400 dark:bg-zinc-900 dark:text-zinc-500">
                    <NewspaperIcon size={44} weight="duotone" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start grow space-y-3">
              <p className="text-xs font-mono uppercase tracking-wide text-yellow-800 dark:text-gray-400">
                {formatDate(news.createdAt)}{' '}
                {formatDate(news.createdAt) && formatRelativeTime(news.createdAt) ? ' - ' : ''}
                {formatRelativeTime(news.createdAt)}
              </p>
              <h2 className="text-3xl font-bold font-serif leading-tight text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300 underline decoration-transparent underline-offset-6 group-hover:decoration-black dark:group-hover:decoration-white">
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

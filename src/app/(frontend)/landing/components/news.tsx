'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, NewspaperIcon } from '@phosphor-icons/react/dist/ssr'
import type { News } from '@/payload-types'
import { Media } from '@/components/Media'
import { useCollectionFetch } from '../useCollectionFetch'
import { LandingNewsSkeleton } from './skeletons/news-skeleton'
import { SectionDivider } from '@/components/SectionDivider'

export function LandingNews() {
  const { data: newsData, loading } = useCollectionFetch<News>(
    '/api/news?depth=1&limit=3&sort=-createdAt&where[_status][equals]=published',
  )

  const mainNews = newsData[0]
  const sideNews = useMemo(() => newsData.slice(1), [newsData])

  const formatDate = (date?: string) => {
    if (!date) return ''

    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <>
        <SectionDivider title="Berita dan Aktivitas" />
        <LandingNewsSkeleton />
      </>
    )
  }

  if (!loading && (!newsData || newsData.length === 0)) {
    return null
  }

  return (
    <>
      <SectionDivider title="Berita dan Aktivitas" />
      <section className=" w-full bg-background  p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px divide-x border border-border">
          {loading && (
            <div className="col-span-full p-8 text-sm text-muted-foreground bg-background">
              Loading news...
            </div>
          )}

          {!loading && !mainNews && (
            <div className="col-span-full p-8 text-sm text-muted-foreground bg-background">
              No news available.
            </div>
          )}

          {mainNews && (
            <Link
              href={mainNews.slug ? `/news/${mainNews.slug}` : '/news'}
              className="group relative overflow-hidden block h-full min-h-87.5 lg:min-h-0"
            >
              {/* IMAGE */}
              <div className="relative w-full h-full">
                {typeof mainNews.heroImage === 'object' && mainNews.heroImage ? (
                  <Media
                    resource={mainNews.heroImage}
                    fill
                    size="50vw"
                    className="w-full h-full"
                    pictureClassName="relative block w-full h-full"
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-background">
                    <NewspaperIcon size={52} weight="duotone" aria-hidden="true" />
                  </div>
                )}

                {/* 🔥 DARK OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* 🔥 CONTENT OVERLAY */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {mainNews.title}
                  </h3>

                  <p className="text-sm text-white/70 mt-1">{formatDate(mainNews.createdAt)}</p>

                  {mainNews.meta?.description && (
                    <p className="text-sm text-white/80 mt-2 line-clamp-2">
                      {mainNews.meta.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          <div className="flex flex-col bg-background divide-y divide-border">
            {sideNews.map((news) => (
              <Link
                key={news.id}
                href={news.slug ? `/news/${news.slug}` : '/news'}
                className="p-8 space-y-2 group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <h4 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-500">{formatDate(news.createdAt)}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {news.meta?.description || 'No description available'}
                </p>
              </Link>
            ))}

            <Link
              href="/news"
              className="group relative flex flex-row items-center justify-left gap-3 bg-muted/20 hover:bg-muted/50 transition-colors w-full h-full p-8"
            >
              <div className="w-11 h-11 rounded-none bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                <ArrowRightIcon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors text-center">
                Lihat Semua
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

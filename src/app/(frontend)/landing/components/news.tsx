'use client'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import type { News } from '@/payload-types'
import { Media } from '@/components/Media'
import { useCollectionFetch } from '../useCollectionFetch'

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

  return (
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
            className="group relative  overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-video">
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
                <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground bg-background">
                  No image
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

                <p className="text-sm text-white/80 mt-2 line-clamp-2">
                  {mainNews.meta?.description || 'No description available'}
                </p>
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

          <div className="p-7">
            <Link href="/news">
              <Button size="lg">
                See more news <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

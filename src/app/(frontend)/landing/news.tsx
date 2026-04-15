'use client'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import type { News } from '@/payload-types'
import { Media } from '@/components/Media'
import { SectionDivider } from '@/components/SectionDivider'

type NewsResponse = {
  docs?: News[]
}

export function LandingNews() {
  const [newsData, setNewsData] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchNews = async () => {
      try {
        const response = await fetch(
          '/api/news?depth=1&limit=3&sort=-createdAt&where[_status][equals]=published',
        )

        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

        const data: NewsResponse = await response.json()

        if (active) {
          setNewsData(data.docs ?? [])
        }
      } catch {
        if (active) {
          setNewsData([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      active = false
    }
  }, [])

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
    <section className="w-full page-gutter bg-background">
      {/* Container utama sejajar dengan Cards */}
      <div className="mx-auto md:border-x border-b border-border">
        {/* Header Section */}
        <SectionDivider
          title="Berita dan Aktifitas"
          containerClassName="px-8 py-10 border-b border-border bg-transparent dark:bg-transparent"
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {loading && (
            <div className="col-span-full p-8 text-sm text-muted-foreground border-l border-r border-b border-border md:border-l-0 md:border-r-0">
              Loading news...
            </div>
          )}

          {!loading && !mainNews && (
            <div className="col-span-full p-8 text-sm text-muted-foreground border-l border-r border-b border-border md:border-l-0 md:border-r-0">
              No news available.
            </div>
          )}

          {/* LEFT: Main News */}
          {mainNews && (
            <Link
              href={mainNews.slug ? `/news/${mainNews.slug}` : '/news'}
              className="flex flex-col border-b lg:border-b-0 border-l border-r md:border-l-0 lg:border-r border-border group cursor-pointer"
            >
              <div className="w-full aspect-video bg-gray-200 dark:bg-zinc-900 overflow-hidden">
                {typeof mainNews.heroImage === 'object' && mainNews.heroImage ? (
                  <Media
                    resource={mainNews.heroImage}
                    fill
                    size="50vw"
                    className="w-full h-full"
                    pictureClassName="relative block w-full h-full"
                    imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {mainNews.title}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(mainNews.createdAt)}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {mainNews.meta?.description || 'No description available'}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* RIGHT: Side News List */}
          <div className="flex flex-col">
            {sideNews.map((news) => (
              <Link
                key={news.id}
                href={news.slug ? `/news/${news.slug}` : '/news'}
                // md:border-r-0 dipasang agar tidak double dengan border container utama di desktop
                className="p-8 space-y-2 group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-l border-r md:border-l-0 md:border-r-0 border-border"
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

            {/* See More Link */}
            <div className="p-8 pt-10 border-l border-r md:border-l-0 md:border-r-0 border-border">
              <Link href="/news">
                <Button size="lg">
                  See more news <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

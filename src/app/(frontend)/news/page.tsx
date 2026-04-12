import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import PageClient from './page.client'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function NewsPage({ searchParams }: Props) {
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)
  const itemsPerPage = 12

  const payload = await getPayload({ config: configPromise })

  // Fetch featured news (first item)
  const featuredResponse = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      title: true,
      slug: true,
      meta: true,
      heroImage: true,
      content: true,
    },
  })

  // Fetch all news with pagination (excluding featured)
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const newsResponse = await payload.find({
    collection: 'news',
    depth: 1,
    limit: itemsPerPage + 1, // +1 to exclude featured
    skip: 0,
    overrideAccess: false,
    page: currentPage,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      title: true,
      slug: true,
      meta: true,
      heroImage: true,
      createdAt: true,
    },
  })

  const featuredNews = featuredResponse.docs?.[0]
  const otherNews = newsResponse.docs || []
  const totalPages = newsResponse.totalPages || 1

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
    return date.toLocaleDateString('id-ID', options)
  }

  const getImageUrl = (image: any) => {
    if (typeof image === 'object' && image?.url) {
      return image.url
    }
    return '/placeholder.jpg'
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x border-gray-200 dark:border-white/10">
          {/* 1. TOP BAR: Back Button */}
          <div className="px-8 pt-10">
            <Link href="/">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. TITLE SECTION */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-white/10">
            <h1 className="text-4xl font-extrabold tracking-tight">Berita dan Aktivitas</h1>
          </div>

          {/* 3. FEATURED NEWS: Big Layout */}
          {featuredNews && (
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-200 dark:border-white/10 group">
              {/* Sisi Gambar: Pakai flex agar tingginya selalu sama dengan sisi teks */}
              <div className="w-full flex lg:border-r border-gray-200 dark:border-white/10">
                <div className="w-full aspect-video overflow-hidden">
                  {typeof featuredNews.heroImage === 'object' ? (
                    <Media resource={featuredNews.heroImage} size="50vw" />
                  ) : (
                    <img
                      src={getImageUrl(featuredNews.heroImage)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={featuredNews.title}
                    />
                  )}
                </div>
              </div>

              {/* Sisi Teks */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="text-blue-500 font-bold uppercase text-xs">Berita Utama</span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight group-hover:text-blue-500 transition-colors">
                    {featuredNews.title}
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-4">
                  {featuredNews.meta?.description || 'No description available'}
                </p>
                <Link href={`/news/${featuredNews.slug}`}>
                  <Button
                    className="w-fit rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
                    size="lg"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* 4. GRID NEWS: Inset Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {otherNews.map((news, index) => (
              <Link key={news.id} href={`/news/${news.slug}`}>
                <div
                  className={`flex flex-col border-b border-gray-200 dark:border-white/10 
                      border-l border-r md:border-l-0 h-full
                      ${(index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'} 
                      hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group`}
                >
                  <div className="p-8 flex flex-col grow">
                    {/* Metadata Header */}
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] text-blue-500 font-extrabold uppercase">
                        News
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {formatDate(news.createdAt)}
                      </span>
                    </div>

                    {/* News Image: Inset */}
                    <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden mb-6">
                      {typeof news.heroImage === 'object' ? (
                        <Media resource={news.heroImage} size="33vw" />
                      ) : (
                        <img
                          src={getImageUrl(news.heroImage)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={news.title}
                        />
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3 mb-8">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {news.meta?.description || 'No description available'}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button
                        variant="default"
                        className="rounded-full px-6 h-10 text-sm font-semibold flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                      >
                        See more <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 5. PAGINATION SECTION */}
          {totalPages > 1 && (
            <div className="py-4 flex justify-center bg-zinc-50/30 dark:bg-transparent">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
                      className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                    >
                      Previous
                    </PaginationLink>
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href={`/news?page=${i + 1}`}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationLink
                      href={
                        currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'
                      }
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-40'
                          : 'cursor-pointer'
                      }
                    >
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Berita dan Aktivitas | ARCES Journal',
    description: 'Temukan berita dan aktivitas terbaru dari ARCES Research Center',
  }
}

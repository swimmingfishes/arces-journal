import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
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
      createdAt: true,
    },
  })

  // Fetch all news with pagination (excluding featured)
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const newsResponse = await payload.find({
    collection: 'news',
    depth: 1,
    limit: itemsPerPage + 1, // +1 to exclude featured
    // skip: 0,
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
    <main className="w-full min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%),linear-gradient(to_bottom,rgba(2,6,23,0.03),transparent_35%)]">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto min-h-screen flex flex-col md:border-x border-gray-200 dark:border-white/10">
          {/* 1. TOP BAR: Back Button */}
          <div className="pt-10 pb-8 px-8 lg:px-12">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur px-5"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. TITLE SECTION */}
          <div className="px-8 lg:px-12 pb-10 pt-4 border-b border-gray-200 dark:border-white/10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Berita & Aktivitas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Temukan informasi terbaru seputar publikasi ilmiah, kegiatan penelitian, dan berbagai
              agenda akademik di ARCES Research Center.
            </p>
          </div>

          {/* 3. FEATURED NEWS: Big Layout */}
          {featuredNews && (
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-200 dark:border-white/10 group bg-zinc-50/30 dark:bg-transparent">
              {/* Sisi Gambar */}
              <div className="w-full relative lg:border-r border-gray-200 dark:border-white/10 overflow-hidden bg-gray-100 dark:bg-zinc-900 border-b lg:border-b-0 min-h-[300px] sm:min-h-[400px] lg:min-h-full">
                <div className="absolute inset-0 w-full h-full">
                  {typeof featuredNews.heroImage === 'object' ? (
                    <Media
                      resource={featuredNews.heroImage}
                      fill
                      size="50vw"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                      pictureClassName="relative block w-full h-full"
                      imgClassName="object-cover"
                    />
                  ) : (
                    <img
                      src={getImageUrl(featuredNews.heroImage)}
                      className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={featuredNews.title}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Sisi Teks */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-500/10 px-3 py-1 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                      Terbaru
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featuredNews.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight group-hover:text-blue-600 transition-colors text-balance">
                    {featuredNews.title}
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                  {featuredNews.meta?.description || 'No description available'}
                </p>
                <div className="pt-2">
                  <Link href={`/news/${featuredNews.slug}`}>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 transition-all px-8 h-12 shadow-md shadow-blue-500/20">
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 4. GRID NEWS: Inset Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr bg-zinc-50/50 dark:bg-zinc-950/20">
            {otherNews.map((news, index) => (
              <Link key={news.id} href={`/news/${news.slug}`}>
                <div
                  className={`flex flex-col border-b border-gray-200 dark:border-white/10 
                      border-l border-r md:border-l-0 h-full overflow-hidden
                      ${(index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'} 
                      hover:bg-white dark:hover:bg-white/2 transition-colors cursor-pointer group`}
                >
                  {/* News Image: Full width / edge-to-edge */}
                  <div className="relative w-full aspect-4/3 bg-gray-100 dark:bg-zinc-900 overflow-hidden border-b border-gray-200/50 dark:border-white/10 shrink-0">
                    {typeof news.heroImage === 'object' ? (
                      <Media
                        resource={news.heroImage}
                        fill
                        size="33vw"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        pictureClassName="relative block w-full h-full"
                        imgClassName="object-cover"
                      />
                    ) : (
                      <img
                        src={getImageUrl(news.heroImage)}
                        className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={news.title}
                      />
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col grow">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                        News
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <Calendar className="w-3 h-3" />
                        {formatDate(news.createdAt)}
                      </span>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3 mb-8 grow">
                      <h3 className="text-xl font-bold leading-[1.3] group-hover:text-blue-600 transition-colors line-clamp-2 text-balance">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {news.meta?.description || 'No description available'}
                      </p>
                    </div>

                    {/* Footer fake CTA */}
                    <div className="mt-auto border-t border-gray-100 dark:border-white/5 pt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        Read article
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 group-hover:text-blue-600 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
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
                      className={
                        currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
                      }
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
                      href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
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

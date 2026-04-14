import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import NewsPageClient from './page.client' // Sesuaikan pathnya
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)
  const itemsPerPage = 10

  const payload = await getPayload({ config: configPromise })

  const newsResponse = await payload.find({
    collection: 'news',
    depth: 1,
    limit: itemsPerPage,
    page: currentPage,
    where: { _status: { equals: 'published' } },
  })

  const otherNews = newsResponse.docs || []
  const totalPages = newsResponse.totalPages || 1

  return (
    <main className="w-full min-h-screen bg-background">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto min-h-screen flex flex-col md:border-x border-gray-200 dark:border-white/10">
          {/* HEADER SECTION (Gaya Gallery) */}
          <div className="px-8 py-16 border-b border-gray-200 dark:border-white/10 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
              ARCES NEWS
            </h1>
            <p className="max-w-2xl text-muted-foreground leading-relaxed italic">
              Temukan informasi terbaru seputar publikasi ilmiah, kegiatan penelitian, dan berbagai
              agenda akademik.
            </p>
          </div>

          {/* CLIENT CONTENT (Search, Filter, and List) */}
          <NewsPageClient initialNews={otherNews} />

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="py-12 flex justify-center bg-zinc-50/30 dark:bg-transparent border-t border-gray-200 dark:border-white/10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}>
                      Previous
                    </PaginationLink>
                  </PaginationItem>
                  {/* ... Loop Page Numbers ... */}
                  <PaginationItem>
                    <PaginationLink
                      href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
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

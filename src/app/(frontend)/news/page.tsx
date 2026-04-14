import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import NewsPageClient from './page.client' // Sesuaikan pathnya
import { RoutePageHeader } from '@/components/RoutePageHeader'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
      <section className="w-full page-gutter">
        <div className="mx-auto min-h-screen flex flex-col md:border-x border-border">
          <RoutePageHeader
            title="Arces — News"
            description="Temukan informasi terbaru seputar publikasi ilmiah, kegiatan penelitian, dan berbagai agenda akademik."
          />

          {/* CLIENT CONTENT (Search, Filter, and List) */}
          <NewsPageClient initialNews={otherNews} />

          {/* PAGINATION */}
          <div className="py-12 flex justify-center bg-zinc-50/30 dark:bg-transparent border-t border-border">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
                    }
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={pageNumber === 1 ? '/news' : `/news?page=${pageNumber}`}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'cursor-pointer'
                    }
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  )
}



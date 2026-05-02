import configPromise from '@payload-config'
import { getPayload } from 'payload'
import NewsPageClient from './page.client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita',
  description: 'Kumpulan berita dan aktivitas terbaru dari ARCES Journal.',
  alternates: {
    canonical: '/news',
  },
}

export const revalidate = 600

const parsePageParam = (value?: string) => {
  const parsed = Number.parseInt(value ?? '1', 10)
  if (!Number.isFinite(parsed) || parsed < 1) return 1
  return parsed
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const requestedPage = parsePageParam(page)
  const itemsPerPage = 3
  const payload = await getPayload({ config: configPromise })

  let newsResponse = await payload.find({
    collection: 'news',
    depth: 1,
    limit: itemsPerPage,
    page: requestedPage,
    where: { _status: { equals: 'published' } },
  })

  const totalPages = Math.max(1, newsResponse.totalPages || 1)
  const currentPage = Math.min(requestedPage, totalPages)

  if (currentPage !== requestedPage) {
    newsResponse = await payload.find({
      collection: 'news',
      depth: 1,
      limit: itemsPerPage,
      page: currentPage,
      where: { _status: { equals: 'published' } },
    })
  }

  const otherNews = newsResponse.docs || []

  return (
    <main className="w-full min-h-screen bg-background">
      <NewsPageClient initialNews={otherNews} currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}

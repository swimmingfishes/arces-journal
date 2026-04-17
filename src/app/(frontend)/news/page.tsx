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

export const dynamic = 'force-static'
export const revalidate = 600

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)
  const itemsPerPage = 6
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
      <NewsPageClient initialNews={otherNews} currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}

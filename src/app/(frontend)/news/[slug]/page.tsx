import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const config = await configPromise
  const payload = await getPayload({ config })
  const { isEnabled } = await draftMode()

  const { docs } = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: isEnabled,
    overrideAccess: !isEnabled ? false : true,
    limit: 1,
    depth: 1,
  })

  const news = docs[0]

  if (!news) {
    notFound()
  }

  return (
    <main style={{ maxWidth: 860, margin: '40px auto', padding: '0 20px' }}>
      <h1>{news.title}</h1>
      <p style={{ color: '#666' }}>
        {news.publishedAt ? new Date(news.publishedAt).toLocaleString() : 'Draft'}
      </p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(news.content, null, 2)}</pre>
    </main>
  )
}

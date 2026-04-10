import Link from 'next/link'
import { getPayload } from 'payload'

import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function NewsListPage() {
  const config = await configPromise
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'news',
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    depth: 0,
    limit: 50,
  })

  return (
    <main style={{ maxWidth: 860, margin: '40px auto', padding: '0 20px' }}>
      <h1>News</h1>
      {docs.length === 0 ? <p>No news published yet.</p> : null}
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            <Link href={`/news/${doc.slug}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

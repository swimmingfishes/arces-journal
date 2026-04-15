import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const newsItems = await payload.find({
    collection: 'news',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
    },
  })

  return (newsItems.docs || [])
    .filter((doc) => doc.slug)
    .map(({ slug }) => {
      return { slug }
    })
}

export default async function NewsDetailPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const newsItem = await queryNewsBySlug({ slug: decodedSlug, draft })

  if (!newsItem) {
    notFound()
  }

  const heroImage = typeof newsItem.heroImage === 'object' ? newsItem.heroImage : null
  const publishDate = newsItem.createdAt
    ? new Date(newsItem.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const updatedDate = newsItem.updatedAt
    ? new Date(newsItem.updatedAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <main className="min-h-screen bg-gray-50/30 dark:bg-zinc-950">
      {draft && <LivePreviewListener />}

      <section className="w-full page-gutter">
        {/* Border Luar (Sejajar Navbar/Footer) */}
        <div className="mx-auto min-h-screen flex flex-col md:border-x border-border">
          <article className="relative grow py-8 lg:py-16">
            {/* Header Title & Meta */}
            <header className="mb-16 text-center lg:mx-36 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold font-serif tracking-tight text-gray-900 dark:text-white text-balance mb-6 leading-tight">
                {newsItem.title}
              </h1>
              {/* <div className="flex items-center justify-center mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  {publishDate || 'No date'}
                </span>
              </div> */}
            </header>

            {/* Hero Image */}
            <div className="relative w-full aspect-[calc(19)/8] overflow-hidden border-y border-border bg-gray-100 dark:bg-zinc-900">
              {heroImage ? (
                <Media
                  resource={heroImage}
                  fill
                  size="100vw"
                  className="w-full h-full"
                  pictureClassName="relative block w-full h-full"
                  imgClassName="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-600">
                  No featured image
                </div>
              )}
            </div>

            <div className="mb-12 sm:mb-16 border-b border-border bg-background/70 dark:bg-zinc-900/40">
              <div className="grid grid-cols-2 md:grid-cols-4">
                <div className="px-6 py-6 md:px-8 md:py-7 border-r border-border">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                    Published
                  </p>
                  <p className="mt-2 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    {publishDate || 'No date'}
                  </p>
                </div>
                <div className="px-6 py-6 md:px-8 md:py-7 border-r border-border">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                    Updated
                  </p>
                  <p className="mt-2 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    {updatedDate || 'No date'}
                  </p>
                </div>
                <div className="px-6 py-6 md:px-8 md:py-7 border-t md:border-t-0 border-r border-border">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                    Type
                  </p>
                  <p className="mt-2 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    News Article
                  </p>
                </div>
                <div className="px-6 py-6 md:px-8 md:py-7 border-t md:border-t-0 border-border">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="mt-2 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    {draft ? 'Draft Preview' : 'Published'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="mx-auto max-w-3xl lg:mx-36 px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert
              [&_p]:leading-loose [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:mb-8
              [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:tracking-tight
              [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-semibold
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-900 dark:[&_blockquote]:border-white [&_blockquote]:bg-gray-50 dark:[&_blockquote]:bg-zinc-900 [&_blockquote]:py-3 [&_blockquote]:px-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:not-italic [&_blockquote]:text-gray-800 dark:[&_blockquote]:text-gray-200
              [&_ul]:my-8 [&_ol]:my-8 [&_li]:mb-2
              [&_img]:rounded-2xl [&_img]:border [&_img]:border-border dark:[&_img]:border-white/10 [&_img]:shadow-md"
            >
              {newsItem.content && <RichText data={newsItem.content} enableGutter={false} />}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const newsItem = await queryNewsBySlug({ slug: decodedSlug, draft: false })

  return generateMeta({ doc: newsItem })
}

const queryNewsBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    draft,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft
          ? []
          : [
              {
                _status: {
                  equals: 'published',
                },
              },
            ]),
      ],
    },
  })

  return result.docs?.[0] || null
})

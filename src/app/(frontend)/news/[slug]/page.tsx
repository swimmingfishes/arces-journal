import { Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
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

  return (
    <main className="min-h-screen bg-gray-50/30 dark:bg-zinc-950">
      <PageClient />
      {draft && <LivePreviewListener />}

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-125 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_60%)]" />

      <section className="w-full page-gutter">
        {/* Border Luar (Sejajar Navbar/Footer) */}
        <div className="mx-auto min-h-screen flex flex-col md:border-x border-border">
          <article className="relative grow lg:mx-36 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
            {/* Header Title & Meta */}
            <header className="mb-10 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-balance mb-6 leading-tight">
                {newsItem.title}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
                <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-blue-200/50 dark:border-blue-500/20">
                  News
                </span>
                <span className="text-gray-300 dark:text-zinc-700">•</span>
                <span className="text-sm font-medium text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {publishDate || 'No date'}
                </span>
              </div>
            </header>

            {/* Hero Image */}
            <div className="relative w-full aspect-video sm:aspect-21/9 rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16 border border-border/80  shadow-xl shadow-black/5 dark:shadow-black/40 bg-gray-100 dark:bg-zinc-900">
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

            {/* Content */}
            <div
              className="mx-auto max-w-3xl prose prose-lg dark:prose-invert prose-blue
              [&_p]:leading-loose [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:mb-8
              [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:tracking-tight
              [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-semibold
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50/50 dark:[&_blockquote]:bg-blue-500/10 [&_blockquote]:py-3 [&_blockquote]:px-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:not-italic [&_blockquote]:text-gray-800 dark:[&_blockquote]:text-gray-200
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




import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import type { News } from '@/payload-types'
import { Media } from '@/components/Media'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import  { cache } from 'react'
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
    <main className="w-full bg-background min-h-screen">
      <PageClient />
      {draft && <LivePreviewListener />}

      <section className="w-full px-6 lg:px-46">
        {/* Border Luar (Sejajar Navbar/Footer) */}
        <div className="mx-auto md:border-x min-h-screen flex flex-col">
          {/* 1. Top Bar: Back Button */}
          <div className="pt-10 pb-10 lg:mx-36">
            <Link href="/news">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to News
              </Button>
            </Link>
          </div>

          {/* 2. INNER CONTENT: Area dengan border dalam (lebih sempit) */}
          <div className="grow lg:mx-36 mb-24">
            {/* Image Section */}
            <div className="w-full aspect-video lg:aspect-21/9 bg-gray-200 overflow-hidden border-b border-gray-200 dark:border-white/10">
              {heroImage ? (
                <Media resource={heroImage} size="100vw" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  No image
                </div>
              )}
            </div>

            {/* Article Wrapper */}
            <div className="space-y-8 ">
              {/* Header Title & Meta */}
              <div className="space-y-4 text-center md:text-left ">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  {newsItem.title}
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-gray-200 dark:border-white/10 justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-blue-500 uppercase tracking-widest">News</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-muted-foreground">{publishDate}</span>
                  </div>
                </div>
              </div>

              {/* Isi Konten */}
              <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-lg">
                {newsItem.content && <RichText data={newsItem.content} enableGutter={false} />}
              </article>
            </div>
          </div>
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

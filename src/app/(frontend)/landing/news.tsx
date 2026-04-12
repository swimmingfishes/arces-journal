'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react'

const newsData = [
  {
    id: 1,
    title: 'Intelligent Systems: Pioneering Industry 4.0 with Aluminum Technologies',
    date: '4 September 2026',
    description:
      'With a portfolio of over 2,700 journals and over 220,000 books, Springer is a global leader in academic and scientific publishing.',
    image: '/path-to-your-image.jpg', // Ganti dengan path image asli (Gedung Udinus)
  },
  {
    id: 2,
    title: 'Intelligent Systems: Pioneering Industry 4.0 with Aluminum Technologies',
    date: '4 September 2026',
    description: 'With a portfolio of over 2,700 journals and over 220,000 books.',
  },
  {
    id: 3,
    title: 'Intelligent Systems: Pioneering Industry 4.0 with Aluminum Technologies',
    date: '4 September 2026',
    description: 'With a portfolio of over 2,700 journals and over 220,000 books.',
  },
]

export function LandingNews() {
  const mainNews = newsData[0]
  const sideNews = newsData.slice(1)

  return (
    <section className="w-full px-6 lg:px-46 bg-background">
      {/* Container utama sejajar dengan Cards */}
      <div className="mx-auto md:border-x border-b border-gray-200 dark:border-white/10">
        {/* Header Section */}
        <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-blue-500">Berita dan Aktifitas</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Main News */}
          <div className="flex flex-col border-b lg:border-b-0 border-l border-r md:border-l-0 lg:border-r border-gray-200 dark:border-white/10 group cursor-pointer">
            <div className="w-full aspect-video bg-gray-200 overflow-hidden">
              <img
                src={mainNews.image}
                alt="Main News"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-8 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-500 transition-colors">
                  {mainNews.title}
                </h3>
                <p className="text-sm text-gray-500">{mainNews.date}</p>
                <p className="text-muted-foreground leading-relaxed">{mainNews.description}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Side News List */}
          <div className="flex flex-col">
            {sideNews.map((news, index) => (
              <div
                key={news.id}
                // md:border-r-0 dipasang agar tidak double dengan border container utama di desktop
                className="p-8 space-y-2 group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10"
              >
                <h4 className="text-lg font-bold leading-snug group-hover:text-blue-500 transition-colors">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-500">{news.date}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{news.description}</p>
              </div>
            ))}

            {/* See More Link */}
            <div className="p-8 pt-10 border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
              <Button size="lg">
                See more news <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

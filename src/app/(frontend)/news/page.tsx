'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Data simulasi lengkap
const allNews = [
  {
    id: 1,
    title: 'Intelligent Systems: Pioneering Industry 4.0 with Aluminum Technologies',
    date: '4 Sept 2026',
    desc: 'Detailed description for main news involving research and community service. This is the featured article that takes more space to highlight its importance in the industry.',
    image: '/udinus.jpg',
  },
  {
    id: 2,
    title: 'Penerapan IoT pada Sistem Monitoring Banjir di Semarang',
    date: '3 Sept 2026',
    desc: 'Implementasi teknologi sensor untuk deteksi dini luapan air sungai di titik-titik rawan banjir.',
    image: '/flood-news.jpg',
  },
  {
    id: 3,
    title: 'Workshop Full-stack Development dengan PERN Stack',
    date: '2 Sept 2026',
    desc: 'Meningkatkan skill developer lokal dengan teknologi modern PostgreSQL, Express, React, dan Node.js.',
    image: '/dev-news.jpg',
  },
  {
    id: 4,
    title: 'Analisis Pasar Crypto: Potensi Hyperliquid di Tahun 2026',
    date: '1 Sept 2026',
    desc: 'Bagaimana ekosistem HYPE mengubah peta investasi digital dan efisiensi transaksi terdesentralisasi.',
    image: '/crypto-news.jpg',
  },
  {
    id: 5,
    title: 'Baby Three V3: Koleksi Art Toy yang Sedang Viral',
    date: '30 Agst 2026',
    desc: 'Mengenal fenomena koleksi kelinci hijau di kalangan kolektor mainan seni di Indonesia.',
    image: '/toy-news.jpg',
  },
  {
    id: 6,
    title: 'Strategi Investasi Emas untuk Mahasiswa Informatika',
    date: '28 Agst 2026',
    desc: 'Cara bijak mengelola dana beasiswa atau gaji intern ke aset fisik yang aman untuk masa depan.',
    image: '/gold-news.jpg',
  },
  {
    id: 7,
    title: 'Implementasi RAG pada Chatbot Akademik Kampus',
    date: '25 Agst 2026',
    desc: 'Optimasi pencarian informasi dokumen jurnal menggunakan Retrieval-Augmented Generation.',
    image: '/rag-news.jpg',
  },
  {
    id: 8,
    title: 'Implementasi RAG pada Chatbot Akademik Kampus',
    date: '25 Agst 2026',
    desc: 'Optimasi pencarian informasi dokumen jurnal menggunakan Retrieval-Augmented Generation.',
    image: '/rag-news.jpg',
  },
  {
    id: 9,
    title: 'Implementasi RAG pada Chatbot Akademik Kampus',
    date: '25 Agst 2026',
    desc: 'Optimasi pencarian informasi dokumen jurnal menggunakan Retrieval-Augmented Generation.',
    image: '/rag-news.jpg',
  },
]

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const featuredNews = allNews[0]
  const otherNews = allNews.slice(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = otherNews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(otherNews.length / itemsPerPage)

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x border-gray-200 dark:border-white/10">
          {/* 1. TOP BAR: Back Button */}
          <div className="px-8 pt-10">
            <Link href="/">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                <ArrowLeftIcon className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. TITLE SECTION */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-white/10">
            <h1 className="text-4xl font-extrabold tracking-tight">Berita dan Aktivitas</h1>
          </div>

          {/* 3. FEATURED NEWS: Big Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-200 dark:border-white/10 group">
            {/* Sisi Gambar: Pakai flex agar tingginya selalu sama dengan sisi teks */}
            <div className="w-full flex lg:border-r border-gray-200 dark:border-white/10">
              <div className="w-full h-80 lg:h-full min-h-[350px] overflow-hidden">
                <img
                  src={featuredNews.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Featured"
                />
              </div>
            </div>

            {/* Sisi Teks */}
            <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="text-blue-500 font-bold uppercase text-xs">Berita Utama</span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight group-hover:text-blue-500 transition-colors">
                  {featuredNews.title}
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed line-clamp-4">
                {featuredNews.desc}
              </p>
              <Button
                className="w-fit rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
                size="lg"
              >
                Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 4. GRID NEWS: Inset Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((news, index) => (
              <div
                key={news.id}
                className={`flex flex-col border-b border-gray-200 dark:border-white/10 
                    border-l border-r md:border-l-0 
                    ${(index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'} 
                    hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group`}
                onClick={() => (window.location.href = `/news/${news.id}`)}
              >
                <div className="p-8 flex flex-col grow">
                  {/* Metadata Header */}
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] text-blue-500 font-extrabold uppercase">News</span>
                    <span className="text-[10px] text-gray-400 font-medium">{news.date}</span>
                  </div>

                  {/* News Image: Inset */}
                  <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden mb-6">
                    <img
                      src={news.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={news.title}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {news.desc}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button
                      variant="default"
                      className="rounded-full px-6 h-10 text-sm font-semibold flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      See more <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5. PAGINATION SECTION */}
          <div className="py-4 flex justify-center bg-zinc-50/30 dark:bg-transparent">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'cursor-pointer'
                    }
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

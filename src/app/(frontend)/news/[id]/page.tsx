'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function NewsDetailPage() {
  // Sementara statis, nanti ID diambil dari params
  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        {/* Border Luar (Sejajar Navbar/Footer) */}
        <div className="mx-auto md:border-x  min-h-screen flex flex-col">
          {/* 1. Top Bar: Back Button */}
          <div className="pt-10 pb-10 lg:mx-36">
            <Link href="/news">
              <Button
                variant="ghost"
                size="lg"
                className="pl-0 mx-0 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <ArrowLeft className="h-4 w-4" /> Back to News
              </Button>
            </Link>
          </div>

          {/* 2. INNER CONTENT: Area dengan border dalam (lebih sempit) */}
          <div className="grow lg:mx-36 mb-24">
            {/* Image Section */}
            <div className="w-full aspect-video lg:aspect-21/9 bg-gray-200 overflow-hidden border-b border-gray-200 dark:border-white/10">
              <img src="/udinus.jpg" alt="News Detail" className="w-full h-full object-cover" />
            </div>

            {/* Article Wrapper */}
            <div className="space-y-8 ">
              {/* Header Title & Meta */}
              <div className="space-y-4 text-center md:text-left ">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  Intelligent Systems: Pioneering Industry 4.0 with Aluminum Technologies
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-gray-200 dark:border-white/10 justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-blue-500 uppercase tracking-widest">News</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-muted-foreground">4 September 2026</span>
                  </div>

                  {/* <Button variant="outline" size="sm" className="rounded-full gap-2 w-fit">
                    <Share2 className="h-4 w-4" /> Share
                  </Button> */}
                </div>
              </div>

              {/* Isi Konten (Statis Panjang) */}
              <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-lg">
                <p>
                  Semarang — Perkembangan teknologi di era Industry 4.0 menuntut integrasi sistem
                  cerdas dalam setiap lini produksi. Universitas Dian Nuswantoro (Udinus) melalui
                  Lembaga ARCES kembali memaparkan riset terbaru mengenai implementasi kecerdasan
                  buatan dalam pengolahan logam aluminium. Riset ini diharapkan mampu meningkatkan
                  efisiensi energi hingga 30%.
                </p>

                <p>
                  Menurut para peneliti, penggunaan model regresi tingkat lanjut dan algoritma
                  optimasi memungkinkan pabrik untuk memprediksi kegagalan mesin sebelum terjadi.
                  Kami tidak hanya berbicara tentang otomasi biasa, tapi tentang sistem yang bisa
                  belajar dari data historis produksi, ujar salah satu pengembang utama sistem ini.
                </p>

                <blockquote className="border-l-4 border-blue-500 pl-6 italic my-8 text-xl text-gray-900 dark:text-white">
                  Inovasi ini adalah langkah besar bagi industri manufaktur lokal untuk bersaing di
                  kancah internasional dengan biaya operasional yang jauh lebih rendah.
                </blockquote>

                <p>
                  Selain aspek teknis, proyek ini juga melibatkan pengabdian masyarakat untuk
                  memberikan pelatihan kepada teknisi lokal di Semarang. Hal ini selaras dengan misi
                  ARCES untuk tidak hanya unggul di jurnal ilmiah, tetapi juga memberikan dampak
                  nyata bagi ekonomi digital dan rekayasa perangkat lunak di Jawa Tengah.
                </p>

                <p>
                  Kedepannya, teknologi ini akan diintegrasikan dengan sistem monitoring berbasis
                  cloud yang memungkinkan pemantauan dari mana saja, memberikan fleksibilitas penuh
                  bagi para pemangku kepentingan untuk mengawasi jalannya produksi secara real-time.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

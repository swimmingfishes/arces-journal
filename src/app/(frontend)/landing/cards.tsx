'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

// Static data - will be replaced with Payload CRUD later
const staticCards = [
  {
    id: 1,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description:
      'Jurnal ilmiah yang berfokus pada publikasi hasil kegiatan pengabdian kepada masyarakat yang berbasis pada riset dan penerapan teknologi.',
  },
  {
    id: 2,
    title: 'Jurnal Pengembangan Teknologi, Ekonomi dan Bisnis Digital',
    description:
      'Jurnal Pengembangan Teknologi, Ekonomi dan Bisnis Digital diterbitkan oleh Lembaga ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
  },
  {
    id: 3,
    title: 'Jurnal Pengabdian kepada Masyarakat',
    description:
      'Jurnal multidisiplin yang diterbitkan Lembaga ARCES yang berfokus pada hasil-hasil karya pengabdian masyarakat serta jurnal nasional pengabdian masyarakat ini berbasis pada ilmu komputer.',
  },
  {
    id: 4,
    title: 'Jurnal Komputasi dan Pengembangan Aplikasi',
    description:
      'Jurnal yang berfokus pada penelitian dibidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
  },
  {
    id: 5,
    title: 'Jurnal Aplikasi Teknologi dan Komputasi',
    description:
      'Jurnal Aplikasi Teknologi dan Komputasi (Jatekom) diterbitkan oleh Organisasi ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
  },
  {
    id: 6,
    title: 'International Journal of Engineering Computing Advanced Research',
    description:
      'International Journal of Engineering Computing Advanced Research (IJECAR) is published by ARCES, which focuses on research in Engineering Computing Advanced Research.',
  },
]

// Make it async and fetch from Payload
// export async function LandingCards() {
//   const payload = await getPayload({ config: configPromise })
//   const { docs: cards } = await payload.find({
//     collection: 'your-collection-name', // Update based on your Payload setup
//     limit: 9,
//   })
//   // ... render cards
// }

interface LandingCardsProps {
  searchQuery: string
}

export function LandingCards({ searchQuery }: LandingCardsProps) {
  const filtered = staticCards.filter((card) => {
    const q = searchQuery.toLowerCase()
    return card.title.toLowerCase().includes(q) || card.description.toLowerCase().includes(q)
  })

  return (
    <section className="w-full px-6 lg:px-46 bg-background">
      {/* Container utama dengan border-x sejajar navbar/hero */}
      <div className="mx-auto md:border-x">
        {/* Judul Section (Dokumen dan Publikasi) */}
        <div className="px-8 py-10 border-b">
          <h2 className="text-2xl font-bold text-blue-500">Dokumen dan Publikasi</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <div
              key={card.id}
              className="flex flex-col border-b border-l border-r md:border-l-0 lg:[&:nth-child(3n)]:border-r-0 border-gray-200 dark:border-white/10 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => (window.location.href = `/jurnal/${card.id}`)}
            >
              {/* 1. Kotak Abu-abu (Image Placeholder) */}
              <div className="relative w-full aspect-video bg-gray-300 dark:bg-gray-700 overflow-hidden">
                {/* <img src={card.image} className="object-cover w-full h-full" /> */}

                {/* 2. Tiga Kotak Kecil Berwarna (Floating) */}
                <div className="absolute bottom-4 left-6 flex gap-1">
                  <div className="w-8 h-8 bg-blue-500 shadow-sm" />
                  <div className="w-8 h-8 bg-yellow-400 shadow-sm" />
                  <div className="w-8 h-8 bg-slate-800 shadow-sm" />
                </div>
              </div>

              {/* 3. Konten Teks */}
              <div className="p-6 flex flex-col grow space-y-4">
                <h3 className="text-lg font-bold leading-snug transition-colors">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {card.description}
                </p>

                {/* 4. Button */}
                <div className="pt-2">
                  <Button size="lg">
                    See more
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

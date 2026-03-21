'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
    <section className="w-full px-6 lg:px-32 pt-8 md:pt-10 pb-16 md:pb-24 lg:pb-32">
      <div className="container mx-auto px-8">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((card) => (
              <Card
                key={card.id}
                className="flex flex-col min-h-70 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => (window.location.href = `/jurnal/${card.id}`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg md:text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col grow gap-4 justify-between">
                  <CardDescription className="text-sm md:text-base">
                    {card.description}
                  </CardDescription>
                  <Button
                    size="lg"
                    variant="default"
                    className="w-24 h-10"
                    onClick={() => (window.location.href = `/jurnal/${card.id}`)}
                  >
                    See more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

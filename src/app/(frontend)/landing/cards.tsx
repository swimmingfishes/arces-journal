'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Static data - will be replaced with Payload CRUD later
const staticCards = [
  {
    id: 1,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
  },
  {
    id: 2,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
  },
  {
    id: 3,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
  },
  {
    id: 4,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
  },
  {
    id: 5,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
  },
  {
    id: 6,
    title: 'Jurnal Riset dan Teknologi dalam Pengalihan Masyarakat',
    description: 'Ensuring quality research to accelerate progress for the benefit of all.',
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

export function LandingCards() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {staticCards.map((card) => (
            <Card
              key={card.id}
              className="flex flex-col min-h-[280px] hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow gap-4 justify-between">
                <CardDescription className="text-sm md:text-base">
                  {card.description}
                </CardDescription>
                <Button size="card" variant="branded" className="w-24">
                  See more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

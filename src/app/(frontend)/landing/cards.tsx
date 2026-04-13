'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { Journal } from '@/payload-types'

type JournalsResponse = {
  docs?: Journal[]
}

interface LandingCardsProps {
  searchQuery: string
}

export function LandingCards({ searchQuery }: LandingCardsProps) {
  const [cards, setCards] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchJournals = async () => {
      try {
        const response = await fetch('/api/journals?depth=0&limit=100&sort=title')

        if (!response.ok) {
          throw new Error('Failed to fetch journals')
        }

        const data: JournalsResponse = await response.json()

        if (active) {
          setCards(data.docs ?? [])
        }
      } catch {
        if (active) {
          setCards([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchJournals()

    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return cards.filter((card) => {
      return card.title.toLowerCase().includes(q) || card.description.toLowerCase().includes(q)
    })
  }, [cards, searchQuery])

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
          {loading && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-gray-200 dark:border-white/10">
              Loading journals...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-gray-200 dark:border-white/10">
              No journals found.
            </div>
          )}

          {filtered.map((card) => (
            <div
              key={card.id}
              className="flex flex-col border-b border-l border-r md:border-l-0 lg:nth-[3n]:border-r-0 border-gray-200 dark:border-white/10 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => (window.location.href = card.link || `/jurnal/${card.id}`)}
            >
              {/* 1. Kotak Abu-abu (Image Placeholder) */}
              <div className="relative w-full aspect-video bg-gray-300 dark:bg-gray-700 overflow-hidden">
                {/* <img src={card.image} className="object-cover w-full h-full" /> */}

                {/* 2. Tiga Kotak Kecil Berwarna (Floating) */}
                <div className="absolute bottom-4 left-6 flex gap-1">
                  <div
                    className="w-8 h-8 shadow-sm"
                    style={{ backgroundColor: card.colors?.primary || '#3b82f6' }}
                  />
                  <div
                    className="w-8 h-8 shadow-sm"
                    style={{ backgroundColor: card.colors?.secondary || '#facc15' }}
                  />
                  <div
                    className="w-8 h-8 shadow-sm"
                    style={{ backgroundColor: card.colors?.accent || '#0f172a' }}
                  />
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

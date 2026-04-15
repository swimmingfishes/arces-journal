'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
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
    <section className="w-full page-gutter bg-background">
      {/* Container utama dengan border-x sejajar navbar/hero */}
      <div className="mx-auto md:border-x">
        {/* Judul Section (Dokumen dan Publikasi) */}
        <div className="px-8 py-10 border-b">
          <h2 className="text-2xl font-bold text-blue-500">Dokumen dan Publikasi</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-border">
              Loading journals...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full px-8 py-10 text-sm text-muted-foreground border-b border-border">
              No journals found.
            </div>
          )}

          {filtered.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col border-b border-l border-r md:border-l-0 lg:nth-[3n]:border-r-0 border-border bg-card/20 hover:bg-card/50 transition-colors cursor-pointer"
              onClick={() => (window.location.href = card.link || `/jurnal/${card.id}`)}
            >
              {(() => {
                const primary = card.colors?.primary || '#3b82f6'
                const secondary = card.colors?.secondary || '#facc15'
                const accent = card.colors?.accent || '#0f172a'

                return (
                  <>
                    {/* Visual header powered by journal color palette */}
                    <div className="relative w-full aspect-video overflow-hidden border-b border-border bg-background">
                      <div className="absolute inset-0 grid grid-cols-3">
                        <div style={{ backgroundColor: primary }} />
                        <div style={{ backgroundColor: secondary }} />
                        <div style={{ backgroundColor: accent }} />
                      </div>

                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      />

                      {/* Foreground objects with blurred backdrop */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 px-5 md:px-7">
                        <div className="h-34 w-20 border border-white/35 bg-white/28 backdrop-blur-md transition-all duration-700 ease-out will-change-transform group-hover:-translate-y-2 group-hover:-rotate-3 group-hover:scale-x-90 group-hover:scale-y-110" />
                        <div className="h-34 w-14 rounded-full border border-white/35 bg-white/24 backdrop-blur-md transition-all duration-700 ease-out delay-75 will-change-transform group-hover:translate-y-2 group-hover:rotate-3 group-hover:scale-x-115 group-hover:scale-y-90" />
                        <div className="h-34 w-20 border border-white/35 bg-white/20 backdrop-blur-md transition-all duration-700 ease-out delay-100 will-change-transform group-hover:-translate-y-2.5 group-hover:-rotate-2 group-hover:scale-x-110 group-hover:scale-y-90" />
                        <div className="h-34 w-14 rounded-full border border-white/35 bg-white/24 backdrop-blur-md transition-all duration-700 ease-out delay-150 will-change-transform group-hover:translate-y-2 group-hover:-rotate-3 group-hover:scale-x-115 group-hover:scale-y-90" />
                        <div className="h-34 w-20 border border-white/35 bg-white/30 backdrop-blur-md transition-all duration-700 ease-out delay-200 will-change-transform group-hover:-translate-y-2 group-hover:rotate-3 group-hover:scale-x-90 group-hover:scale-y-110" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col grow space-y-4">
                      <h3 className="text-xl font-semibold leading-snug transition-colors text-balance group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {card.description}
                      </p>

                      <div className="pt-2">
                        <Button size="lg" className="gap-2 group/btn">
                          See more
                          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

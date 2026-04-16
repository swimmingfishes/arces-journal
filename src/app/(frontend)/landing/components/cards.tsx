'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import type { Journal } from '@/payload-types'
import { useCollectionFetch } from '../useCollectionFetch'
import { LandingCardsSkeleton } from './skeletons/cards-skeleton'

export function LandingCards() {
  const { data: cards, loading } = useCollectionFetch<Journal>('/api/journals')
  const lgColumns = 3
  const fillerCount = cards.length > 0 ? (lgColumns - (cards.length % lgColumns)) % lgColumns : 0

  if (loading) {
    return <LandingCardsSkeleton />
  }

  if (!loading && cards.length === 0) {
    return (
      <div className="w-full p-8 text-center text-sm text-muted-foreground bg-background">
        No journals found.
      </div>
    )
  }

  return (
    <section className="w-full bg-background">
      <div className="m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full px-8 py-10 text-sm text-muted-foreground bg-background">
            Loading journals...
          </div>
        )}

        {!loading && cards.length === 0 && (
          <div className="col-span-full px-8 py-10 text-sm text-muted-foreground bg-background">
            No journals found.
          </div>
        )}

        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative border border-border bg-background flex flex-col cursor-pointer transition"
            onClick={() => window.open(card.link || `/jurnal/${card.id}`, '_blank')}
          >
            {(() => {
              const primary = card.colors?.primary || '#3b82f6'
              const secondary = card.colors?.secondary || '#facc15'
              const accent = card.colors?.accent || '#0f172a'

              return (
                <div className="flex flex-col h-full divide-y">
                  {/* IMAGE */}
                  <div className="relative w-full aspect-[calc(16/7)] overflow-hidden">
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

                    {/* Decorative shapes */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 group">
                      <div className="flex items-center justify-center w-full h-full max-h-36">
                        <div className="flex-1 h-full bg-white/28 backdrop-blur-xl transition-all duration-300 ease-out group-hover:opacity-80 group-hover:translate-x-2" />

                        <div className="flex-1 h-full rounded-full bg-white/24 backdrop-blur-xl transition-all duration-300 ease-out delay-75 group-hover:h-[88%] group-hover:opacity-80 group-hover:translate-x-1" />

                        <div className="flex-1 h-full bg-white/20 backdrop-blur-xl transition-all duration-300 ease-out delay-100 z-10 group-hover:h-[75%] group-hover:opacity-70 group-hover:-translate-y-1" />

                        <div className="flex-1 h-full rounded-full bg-white/24 backdrop-blur-xl transition-all duration-300 ease-out delay-150 group-hover:h-[88%] group-hover:opacity-80 group-hover:-translate-x-1" />

                        <div className="flex-1 h-full bg-white/30 backdrop-blur-xl transition-all duration-300 ease-out delay-200 group-hover:opacity-80 group-hover:-translate-x-2" />
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col grow">
                    <h3 className="text-xl font-bold leading-snug text-balance text-neutral-950 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {card.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                      {card.description}
                    </p>

                    {/* BUTTON (always bottom) */}
                    <div className="mt-auto pt-4">
                      <Button
                        size="lg"
                        className="w-full rounded-none gap-2 group/btn justify-between"
                      >
                        See more
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        ))}
      </div>
    </section>
  )
}

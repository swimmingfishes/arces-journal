'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { ParticlesBackground } from '@/components/ParticlesBackground'

export function LandingCTA() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 px-8 py-16 md:py-20">
        <div className="space-y-8 flex flex-col items-center justify-center text-center">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Start publish with us
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Prepare for a development environment that can finally keep pace with the speed of
              your mind.
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-full bg-blue-500 hover:bg-blue-600 px-8 h-12 text-base font-medium transition-all group"
          >
            Get Started
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

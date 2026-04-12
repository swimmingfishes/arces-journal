'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function LandingCTA() {
  return (
    <section className="w-full px-6 lg:px-46 bg-background">
      <div className="mx-auto md:border-x border-gray-200 dark:border-white/10">
        {/* Konten CTA dengan border-t untuk memisahkan dari Gallery */}
        <div className="flex flex-col items-center justify-center py-24 md:py-32 space-y-8 border-t border-gray-200 dark:border-white/10 text-center px-6">
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
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}

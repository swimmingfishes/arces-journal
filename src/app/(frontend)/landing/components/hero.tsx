'use client'

import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 lg:py-32 text-center">
          {/* Tagline */}
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 tracking-wide">
            By arces.journals.id
          </p>

          {/* Title */}
          <h1 className="mt-4 font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-gray-900 dark:text-white text-balance">
            Serving the Global <br className="hidden md:block" />
            Research Community
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Menyediakan akses terbuka (Open Access) ke jurnal-jurnal unggulan hasil penelitian
            sejawat (peer-reviewed) dan pengabdian masyarakat di bidang komputasi, rekayasa, serta
            bisnis digital.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 px-6 py-5 text-base">
              Explore journals
              <ArrowRightIcon className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-6 py-5 text-base border-gray-300 dark:border-gray-700"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

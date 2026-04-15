'use client'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative z-10 mx-auto page-gutter">
        <div className="relative border-border md:border-x md:border-b px-8">
          {/* particles */}
          <div className="absolute inset-0 -z-10">
            <ParticlesBackground />
          </div>

          <div className="py-12 md:py-16 lg:py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center">
              <p className="text-base text-gray-600 dark:text-gray-300">By arces.journals.id</p>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold leading-18 text-gray-900 dark:text-white text-balance">
                Serving the global research Community
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
                Menyediakan akses terbuka (Open Access) ke jurnal-jurnal unggulan hasil penelitian
                sejawat (peer-reviewed) dan pengabdian masyarakat di bidang komputasi, rekayasa,
                serta bisnis digital.
              </p>

              <div className="flex justify-center pt-4 md:pt-6">
                <Button size="lg" className="gap-2">
                  Explore journals <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

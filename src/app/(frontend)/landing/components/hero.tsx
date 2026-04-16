'use client'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { SectionDivider } from '@/components/SectionDivider'

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <SectionDivider containerClassName="px-8 py-0 bg-transparent dark:bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>

        <div className="relative z-10 py-12 md:py-16 lg:py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center">
            <p className="text-base text-gray-600 dark:text-gray-300">By arces.journals.id</p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-semibold leading-18 text-gray-900 dark:text-white text-balance">
              Serving the global research Community
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Menyediakan akses terbuka (Open Access) ke jurnal-jurnal unggulan hasil penelitian
              sejawat (peer-reviewed) dan pengabdian masyarakat di bidang komputasi, rekayasa, serta
              bisnis digital.
            </p>

            <div className="flex justify-center pt-4 md:pt-6">
              <Button size="lg" className="gap-2">
                Explore journals <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SectionDivider>
    </section>
  )
}

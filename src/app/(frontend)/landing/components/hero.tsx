'use client'

import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export function LandingHero() {
  const scrollToDocuments = () => {
    const section = document.getElementById('dokumen-publikasi')
    if (!section) return

    const header = document.querySelector('header')
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Radial spotlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-24 text-center">
          {/* Tagline with animation */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              By arces.journals.id
            </span>
          </div>
          {/* Title with gradient text effect */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h1 className="mt-8 font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white text-balance tracking-tight">
              Serving the Global{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Research
              </span>
              <br className="hidden md:block" />
              <span className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
          </div>
          {/* Description with improved typography */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <p className="mt-8 max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground text-balance">
              Menyediakan akses terbuka{' '}
              <span className="font-medium text-foreground">(Open Access)</span> ke jurnal-jurnal
              unggulan hasil penelitian sejawat{' '}
              <span className="font-medium text-foreground">(peer-reviewed)</span> dan pengabdian
              masyarakat di bidang komputasi, rekayasa, serta bisnis digital.
            </p>
          </div>
          {/* Stats section */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">50+ Jurnal Aktif</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">1000+ Artikel</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Open Access</span>
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <Button
              size="lg"
              className="gap-2 px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary/90 text-white dark:text-black"
              onClick={scrollToDocuments}
            >
              Explore journals
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base border-2 hover:bg-muted/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Link href="/tentang">Learn more</Link>
            </Button>
          </div>
          {/* Subtle scroll indicator */}
          <div className="mt-20 flex justify-center animate-in fade-in duration-1000 delay-700">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="h-12 w-6 rounded-full border-2 border-muted-foreground/30 flex justify-center">
                <div className="h-2 w-1 bg-muted-foreground/40 rounded-full mt-1 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

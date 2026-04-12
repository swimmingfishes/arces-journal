'use client'
// import React, { useEffect, useState } from 'react'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react'

export function LandingHero() {
  // const [scrolled, setScrolled] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10)
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <section className="w-full relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto px-6 lg:px-46">
        <div className="relative md:border-x md:border-b border-gray-200 dark:border-white/10 px-8">
          {/* particles */}
          <div className="absolute inset-0 -z-1">
            <ParticlesBackground />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6 pt-8 lg:pt-32 mb-16">
              <p className="text-base text-gray-600 dark:text-gray-300">By arces.journals.id</p>
              <h1 className="text-xl md:text-2xl lg:text-6xl text-center md:text-left font-extrabold leading-tight text-gray-900 dark:text-white">
                Serving the global research Community
              </h1>
              <p className="text-base leading-relaxed max-w-lg text-gray-600 dark:text-gray-300 text-center md:text-left">
                Menyediakan akses terbuka (Open Access) ke jurnal-jurnal unggulan hasil penelitian
                sejawat (peer-reviewed) dan pengabdian masyarakat di bidang komputasi, rekayasa,
                serta bisnis digital.
              </p>

              <div className="flex justify-center md:justify-start mt-14">
                <Button size="lg">
                  Explore journals <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

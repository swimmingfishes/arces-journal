'use client'
import React, { useEffect, useState } from 'react'
import { ParticlesBackground } from '@/components/ParticlesBackground'

export function LandingHero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="w-full relative overflow-hidden bg-background">
      {/* Fixed siluet — tembus ke navbar */}
      <div className="pointer-events-none">
        <div
          className={`fixed top-0 left-0 w-[400px] h-[300px] rounded-full bg-[#28A745]/15 dark:bg-[#28A745]/8 blur-[80px] z-40 transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        />
        <div
          className={`fixed top-0 right-0 w-[500px] h-[300px] rounded-full bg-[#007BFF]/15 dark:bg-[#007BFF]/8 blur-[80px] z-40 transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[1]">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 lg:px-32 py-6 md:py-10 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6 pt-8 lg:pt-32 mb-16">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              Pusat Publikasi Riset dan Inovasi Teknologi Terbuka
            </h1>
            <p className="text-base leading-relaxed max-w-lg text-gray-600 dark:text-gray-300">
              Menyediakan akses terbuka (Open Access) ke jurnal-jurnal unggulan hasil penelitian
              sejawat (peer-reviewed) dan pengabdian masyarakat di bidang komputasi, rekayasa, serta
              bisnis digital.
            </p>
          </div>
        </div>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  )
}

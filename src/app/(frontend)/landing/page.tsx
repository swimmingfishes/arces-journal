'use client'
import { SectionDivider } from '@/components/SectionDivider'
import { LandingHero } from './components/hero'
import { LandingCards } from './components/cards'
import { LandingNews } from './components/news'
import { LandingGallery } from './components/gallery'
import { LandingCTA } from './components/cta'

export default function LandingPage() {
  return (
    <main className="w-full h-auto divide-y">
      <LandingHero />
      <SectionDivider title="Dokumen dan Publikasi" />
      <LandingCards />
      <LandingNews />
      <LandingGallery />
      <LandingCTA />
    </main>
  )
}

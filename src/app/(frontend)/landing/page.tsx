import React from 'react'
import { LandingHero } from './hero'
import { LandingSearch } from './search'
import { LandingCards } from './cards'

export const metadata = {
  title: 'Home | Arces Journal',
  description:
    'Serving the global research community with quality journals and research platforms.',
}

export default function LandingPage() {
  return (
    <main className="w-full">
      <LandingHero />
      <LandingSearch />
      <LandingCards />
    </main>
  )
}

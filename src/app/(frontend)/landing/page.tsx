'use client'
import React, { useState } from 'react'
import { LandingHero } from './hero'
// import { LandingSearch } from './search'
import { LandingCards } from './cards'
import { LandingNews } from './news'
import { LandingGallery } from './gallery'
import { LandingCTA } from './cta'

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <main className="w-full">
      <LandingHero />
      {/* <LandingSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} /> */}
      <LandingCards searchQuery={searchQuery} />
      <LandingNews />
      <LandingGallery />
      <LandingCTA />
    </main>
  )
}

'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'

export function LandingSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Search:', searchQuery)
    }
  }

  return (
    <section className="w-full md:py-16">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search journals and research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 md:py-5 text-base md:text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 md:p-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

export default async function SearchButton({ allMembers }: { allMembers: any[] }) {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Filter data berdasarkan search bar
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []
    return allMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.university.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, allMembers])

  return (
    <div className="flex justify-start px-8 py-6 border-b border-border relative">
      <div className="relative w-full">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            placeholder="Cari nama kepengurusan..."
            className="w-full rounded-full border border-border bg-white/70 dark:bg-zinc-900/70 pl-12 pr-4 h-14 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
        </div>

        {/* Hasil Search Dropdown */}
        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-border z-100 shadow-2xl max-h-87.5 overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-b last:border-0 border-border/70"
                onClick={() => {
                  setSelectedMember(result)
                  setSearchQuery('')
                }}
              >
                <div className="h-12 w-12 rounded-full overflow-hidden border border-border/70">
                  <img src={result.image} className="h-full w-full object-cover" alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{result.name}</span>
                  <span className="text-[10px] text-primary font-black uppercase tracking-wider">
                    {result.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

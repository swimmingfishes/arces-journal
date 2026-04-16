'use client'

import { useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

import type { Member } from '../types'

type SearchMemberBarProps = {
  allMembers: Member[]
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSelectMember: (member: Member) => void
}

export function SearchMemberBar({
  allMembers,
  searchQuery,
  onSearchQueryChange,
  onSelectMember,
}: SearchMemberBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []

    return allMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.university.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [allMembers, searchQuery])

  return (
    <div className="relative flex justify-start px-8 py-6">
      <div className="relative w-full">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            placeholder="Cari nama kepengurusan..."
            className="h-14 w-full rounded-full border border-border bg-white/70 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-zinc-900/70"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
        </div>

        {isSearchFocused && searchResults.length > 0 ? (
          <div className="absolute top-full left-0 right-0 z-100 max-h-87.5 overflow-y-auto border border-border bg-white shadow-2xl dark:bg-zinc-900">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex cursor-pointer items-center gap-4 border-b border-border/70 p-4 transition-colors last:border-0 hover:bg-gray-50 dark:hover:bg-white/5"
                onClick={() => {
                  onSelectMember(result)
                  onSearchQueryChange('')
                }}
              >
                <div className="h-12 w-12 overflow-hidden rounded-full border border-border/70">
                  <img src={result.image} className="h-full w-full object-cover" alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{result.name}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                    {result.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

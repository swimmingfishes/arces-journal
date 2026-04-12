'use client'
import React from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { InputGroup, InputGroupInput, InputGroupText } from '@/components/ui/input-group'

interface LandingSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function LandingSearch({ searchQuery, onSearchChange }: LandingSearchProps) {
  return (
    <section className="w-full px-6 lg:px-32 pt-6 md:pt-8 pb-0 relative">
      {/* Siluet dari bawah */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 left-10 w-75 h-37.5 rounded-full bg-[#28A745]/15 dark:bg-[#28A745]/8 blur-[60px]" />
        <div className="absolute -bottom-10 right-10 w-75 h-37.5 rounded-full bg-[#007BFF]/15 dark:bg-[#007BFF]/8 blur-[60px]" />
      </div>

      <div className="mx-auto px-8 relative z-10">
        <form onSubmit={(e) => e.preventDefault()}>
          <InputGroup className="h-10 md:h-20 backdrop-blur-md bg-white/40 dark:bg-white/5 border-0 border-b border-gray-200/60 dark:border-white/10 shadow-sm rounded-xl">
            <InputGroupText className="pl-2 md:pl-8 bg-transparent border-0">
              <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
            </InputGroupText>
            <InputGroupInput
              type="text"
              placeholder="Search journals and research..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-full text-base md:text-lg bg-transparent border-0 focus:ring-0 focus-visible:ring-0"
            />
          </InputGroup>
        </form>
      </div>
    </section>
  )
}

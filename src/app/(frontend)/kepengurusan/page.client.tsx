'use client'

import { Fragment, useState, useMemo } from 'react'
import { ArrowSquareOutIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { RoutePageHeader } from '@/components/RoutePageHeader'

export default function PageClientContent({ allMembers }: { allMembers: any[] }) {
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

  const editorialTeam = allMembers.filter((m) => m.role === 'editorial')
  const reviewerTeam = allMembers.filter((m) => m.role === 'reviewer')

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full page-gutter">
        <div className="mx-auto md:border-x border-border min-h-screen">
          <RoutePageHeader
            title="Kepengurusan"
            description="Telusuri tim editorial dan reviewer ARCES, lengkap dengan institusi serta profil singkat masing-masing anggota."
          />

          {/* 2. SEARCH SECTION */}
          <div className="flex justify-start px-8 py-6 border-b border-border relative">
            <div className="relative w-full">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                <input
                  placeholder="Cari nama kepengurusan..."
                  className="w-full rounded-full border border-border bg-white/70 dark:bg-zinc-900/70 pl-12 pr-4 h-14 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-wider">
                          {result.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. CONTENT AREA */}
          <div className="flex flex-col">
            {/* SEKSI EDITORIAL TEAM */}
            <section>
              {/* Judul dengan Border Atas & Bawah melintang penuh */}
              <div className="px-8 py-6 border-b border-border bg-zinc-50/30 dark:bg-zinc-900/10">
                <h2 className="text-2xl font-bold text-blue-500">Editorial Team</h2>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {editorialTeam.map((member) => (
                    <TeamCard key={member.id} member={member} onClick={setSelectedMember} />
                  ))}
                </div>
              </div>
            </section>

            {/* SEKSI REVIEWER */}
            <section className="border-t border-border">
              {/* Judul dengan Border Bawah melintang penuh */}
              <div className="px-8 py-6 border-b border-border bg-zinc-50/30 dark:bg-zinc-900/10">
                <h2 className="text-2xl font-bold text-blue-500">Reviewers</h2>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 pb-20">
                  {reviewerTeam.map((member) => (
                    <TeamCard key={member.id} member={member} onClick={setSelectedMember} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <MemberDialog member={selectedMember} onClose={() => setSelectedMember(null)} />
    </main>
  )
}

// Komponen Card Kecil agar Kode Rapi
function TeamCard({ member, onClick }: { member: any; onClick: any }) {
  return (
    <div className="space-y-4 group" onClick={() => onClick(member)}>
      <div className="w-full aspect-square bg-gray-100 dark:bg-zinc-800 overflow-hidden cursor-pointer border">
        <img
          src={member.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={member.name}
        />
      </div>
      <div className="space-y-1.5 cursor-pointer">
        <h3 className="text-base font-bold leading-snug group-hover:underline group-hover:font-extrabold transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-tight border-y py-2">
          {member.university}
        </p>
        <p className="text-xs text-muted-foreground">{member.country}</p>
      </div>
    </div>
  )
}

// Komponen Dialog Popup
function MemberDialog({ member, onClose }: { member: any; onClose: any }) {
  if (!member) return null

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-8 overflow-hidden border-none rounded-xl bg-white dark:bg-zinc-950">
        <VisuallyHidden.Root asChild>
          <DialogTitle>Profil {member.name}</DialogTitle>
        </VisuallyHidden.Root>

        <div className="flex flex-col items-start gap-6">
          {/* Baris Atas: Foto & Info Utama */}
          <div className="flex gap-6 items-start w-full">
            {/* Foto Profil: Inset Rounded */}
            <div className="w-32 h-32 shrink-0 bg-gray-100 rounded-2xl overflow-hidden border border-border/70">
              <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
            </div>

            {/* Nama & Univ */}
            <div className="flex flex-col gap-1 pt-2">
              <h4 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                {member.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {member.university}
              </p>
              <p className="text-sm text-gray-400">{member.country}</p>
            </div>
          </div>

          {/* Divider & Links Label */}
          {member.links && member.links.length > 0 && (
            <div className="w-full space-y-4 pt-4">
              <p className="text-sm font-medium text-gray-400">Links:</p>

              {/* Action Links: Row Style dengan Icon External */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {member.links.map((link: any, index: number) => (
                  <Fragment key={index}>
                    <Link
                      href={link.url}
                      target="_blank"
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                    >
                      {link.label} <ArrowSquareOutIcon className="h-3.5 w-3.5" />
                    </Link>

                    {/* Separator Garis Vertikal */}
                    {index < member.links.length - 1 && (
                      <div className="h-4 w-px bg-gray-200 dark:bg-white/10 hidden sm:block" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

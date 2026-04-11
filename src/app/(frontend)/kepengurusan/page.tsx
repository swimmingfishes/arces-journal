'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Mail, Search, User } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

// Data Statis yang lebih lengkap (Editorial + Reviewer)
const allMembers = [
  // Editorial Team
  {
    id: 1,
    role: 'editorial',
    name: 'Eko Hari Rachmawanto',
    university: 'Universitas Dian Nuswantoro',
    country: 'Indonesia',
    image: '/udin.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'eko@arces.ac.id',
  },
  {
    id: 2,
    role: 'editorial',
    name: 'Hadapiningraja Kusumodestoni',
    university: 'Universitas Islam Nahdlatul Ulama Jepara',
    country: 'Indonesia',
    image: '/udinus.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'hada@unu.ac.id',
  },
  {
    id: 3,
    role: 'editorial',
    name: 'Apri Junaidi',
    university: 'Institut Teknologi Telkom Purwokerto',
    country: 'Indonesia',
    image: '/toy-news.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'apri@ittelkom.ac.id',
  },
  {
    id: 4,
    role: 'editorial',
    name: 'Ikhsan Romli',
    university: 'Universitas Pelita Bangsa',
    country: 'Indonesia',
    image: '/rag-news.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'ikhsan@upb.ac.id',
  },

  // Reviewer
  {
    id: 5,
    role: 'reviewer',
    name: 'Zudha Pratama',
    university: 'Universitas Dian Nuswantoro',
    country: 'Indonesia',
    image: '/udin.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'zudha@arces.ac.id',
  },
  {
    id: 6,
    role: 'reviewer',
    name: 'Castaka Agus Sugianto',
    university: 'Politeknik TEDC Bandung',
    country: 'Indonesia',
    image: '/udinus.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'castaka@tedc.ac.id',
  },
  {
    id: 7,
    role: 'reviewer',
    name: 'Tri Ngudi Wiyatno',
    university: 'Universitas Pelita Bangsa',
    country: 'Indonesia',
    image: '/toy-news.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'tri@upb.ac.id',
  },
  {
    id: 8,
    role: 'reviewer',
    name: 'Cahaya Jatmoko',
    university: 'Universitas Dian Nuswantoro',
    country: 'Indonesia',
    image: '/rag-news.jpg',
    scholar: '#',
    wos: '#',
    scopus: '#',
    email: 'cahaya@arces.ac.id',
  },
]

export default function KepengurusanPage() {
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
  }, [searchQuery])

  const editorialTeam = allMembers.filter((m) => m.role === 'editorial')
  const reviewerTeam = allMembers.filter((m) => m.role === 'reviewer')

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x border-gray-200 dark:border-white/10 min-h-screen">
          {/* 1. TOP BAR: Back Button */}
          <div className="px-8 pt-10">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 -ml-4 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. SEARCH SECTION - Search Bar Diperbesar (h-12) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-8 py-8 border-b border-gray-200 dark:border-white/10 gap-4 mt-4 relative">
            <h1 className="text-4xl font-extrabold tracking-tight">Kepengurusan</h1>

            <div className="relative w-full max-w-xs">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Cari nama kepengurusan..."
                  className="pl-12 h-12 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
              </div>

              {/* Hasil Search Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-[24px] z-50 overflow-hidden max-h-[350px] overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-b last:border-0 border-gray-100 dark:border-white/5"
                      onClick={() => {
                        setSelectedMember(result)
                        setSearchQuery('')
                      }}
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100">
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
              <div className="px-8 py-6 border-b border-gray-200 dark:border-white/10 bg-zinc-50/30 dark:bg-zinc-900/10">
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
            <section className="border-t border-gray-200 dark:border-white/10">
              {/* Judul dengan Border Bawah melintang penuh */}
              <div className="px-8 py-6 border-b border-gray-200 dark:border-white/10 bg-zinc-50/30 dark:bg-zinc-900/10">
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
      <div className="w-full aspect-square bg-gray-100 dark:bg-zinc-800 overflow-hidden cursor-pointer border ">
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
      <DialogContent className="sm:max-w-[480px] p-8 overflow-hidden border-none rounded-xl bg-white dark:bg-zinc-950">
        <VisuallyHidden.Root>
          <DialogTitle>Profil {member.name}</DialogTitle>
          <DialogDescription>Detail informasi kepengurusan</DialogDescription>
        </VisuallyHidden.Root>

        <div className="flex flex-col items-start gap-6">
          {/* Baris Atas: Foto & Info Utama */}
          <div className="flex gap-6 items-start w-full">
            {/* Foto Profil: Inset Rounded */}
            <div className="w-32 h-32 shrink-0 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 ">
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
          <div className="w-full space-y-4 pt-4">
            <p className="text-sm font-medium text-gray-400">Links:</p>

            {/* Action Links: Row Style dengan Icon External */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={member.wos}
                target="_blank"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
              >
                Web of Science <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              {/* Separator Garis Vertikal (Opsional sesuai gambar) */}
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10 hidden sm:block" />

              <Link
                href={member.scopus}
                target="_blank"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
              >
                SCOPUS ID <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10 hidden sm:block" />

              <Link
                href={member.scholar}
                target="_blank"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
              >
                Scholar ID <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

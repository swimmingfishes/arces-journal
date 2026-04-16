'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'

export const HeaderClient: React.FC<{ data: Header }> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)

  // Langsung gunakan headerTheme, tidak perlu buat state 'theme' baru
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Reset theme ketika pindah halaman
  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    // Panggil sekali saat pertama kali render (berjaga-jaga jika user refresh saat posisi di bawah)
    handleScroll()

    // Tambahkan passive: true untuk performa scroll yang lebih baik
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-background/70 backdrop-blur-sm'}`}
      // Langsung gunakan nilai dari Context di sini
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="relative h-20 flex items-center border-x border-b border-border px-8">
        {/* Left: Logo */}
        <Link href="/" scroll={false} className="h-full flex items-center">
          <p className="font-mono font-bold text-foreground text-2xl">ARCES</p>
        </Link>

        {/* Center: Nav (desktop) */}
        <div className="hidden md:flex flex-1 justify-center h-full items-stretch">
          <HeaderNav data={data} />
        </div>

        {/* Right: Theme toggle + mobile menu */}
        <div className="ml-auto md:ml-0 flex items-center">
          <HeaderNav data={data} mobileOnly />
        </div>
      </div>
    </header>
  )
}

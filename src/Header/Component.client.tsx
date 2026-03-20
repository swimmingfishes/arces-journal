'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

export const HeaderClient: React.FC<{ data: Header }> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500 px-6 lg:px-32
    ${
      scrolled
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md'
        : 'bg-transparent backdrop-blur-none'
    }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Siluet warna — seamless dengan hero, hilang saat scroll */}
      {/* <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute -top-10 -left-10 w-[300px] h-[120px] rounded-full bg-[#28A745]/20 dark:bg-[#28A745]/10 blur-[50px]" />
        <div className="absolute -top-10 right-10 w-[250px] h-[120px] rounded-full bg-[#007BFF]/20 dark:bg-[#007BFF]/10 blur-[50px]" />
      </div> */}

      <div className="relative py-3 flex justify-between items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

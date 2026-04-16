'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
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
      className={`w-full sticky top-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-background/70 backdrop-blur-sm'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="relative h-20 flex items-center md:border-x md:border-b border-border px-8">
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

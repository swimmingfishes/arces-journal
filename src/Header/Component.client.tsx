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
      className={`w-full sticky top-0 z-50 transition-all duration-500 px-6 lg:px-46
    ${
      scrolled
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md'
        : 'bg-transparent backdrop-blur-none'
    }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="relative py-3 flex justify-between items-center px-8 md:border-x md:border-b">
        <Link href="/" className="flex items-center gap-3">
          <p className="font-mono font-bold text-gray-600 dark:text-stone-200 text-2xl">ARCES</p>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

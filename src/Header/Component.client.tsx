'use client'

import Link from 'next/link'
import React from 'react'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'

export const HeaderClient: React.FC<{ data: Header }> = ({ data }) => {
  return (
    <header
      className="
        w-full sticky top-0 z-50
        bg-white/80 dark:bg-black/80
        backdrop-blur-md border-gray-200 dark:border-gray-800
      "
    >
      <div className="relative h-18 flex items-center px-8 border-x border-b border-border">
        {/* Left: Logo */}
        <Link href="/" className="h-full flex items-center">
          <p className="font-mono font-bold text-2xl text-black dark:text-white">ARCES</p>
        </Link>

        {/* Center: Nav (desktop) */}
        <div className="hidden md:flex flex-1 justify-center h-full items-stretch">
          <HeaderNav data={data} />
        </div>

        {/* Right: Mobile menu */}
        <div className="ml-auto md:ml-0 flex items-center">
          <HeaderNav data={data} mobileOnly />
        </div>
      </div>
    </header>
  )
}

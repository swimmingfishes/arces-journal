'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ListIcon, XIcon } from '@phosphor-icons/react/dist/ssr'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kepengurusan', href: '/kepengurusan' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Kontak dan layanan', href: '/kontak-layanan' },
]

export const HeaderNav: React.FC<{ data: HeaderType; mobileOnly?: boolean }> = ({ mobileOnly }) => {
  const [open, setOpen] = useState(false)

  if (mobileOnly) {
    return (
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          className="md:hidden p-2 rounded-md text-foreground/80 hover:bg-foreground/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute top-full left-0 right-0 bg-background border-y border-border shadow-lg md:hidden z-50">
            <nav className="flex flex-col px-8 py-4 gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    )
  }

  // Desktop nav
  return (
    <nav className="flex items-stretch gap-1 h-full">
      {navLinks.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          scroll={false}
          className="relative isolate inline-flex h-full items-center px-4 text-[15px] font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-foreground/12 before:opacity-0 before:scale-95 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:scale-100"
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

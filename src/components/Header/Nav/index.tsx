'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  HouseIcon,
  ImagesIcon,
  InfoIcon,
  ListIcon,
  MailboxIcon,
  NewspaperIcon,
  UsersThreeIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr'

const navLinks = [
  { label: 'Home', href: '/', icon: HouseIcon },
  { label: 'Tentang', href: '/tentang', icon: InfoIcon },
  { label: 'Kepengurusan', href: '/kepengurusan', icon: UsersThreeIcon },
  { label: 'News', href: '/news', icon: NewspaperIcon },
  { label: 'Gallery', href: '/gallery', icon: ImagesIcon },
  { label: 'Kontak dan layanan', href: '/kontak-layanan', icon: MailboxIcon },
]

export const HeaderNav: React.FC<{ data: HeaderType; mobileOnly?: boolean }> = ({ mobileOnly }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg md:hidden z-50">
            <nav className="flex flex-col px-8 py-4 gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors
                    ${
                      pathname === href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                    }`}
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
    <nav className="flex items-center gap-1">
      {navLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${pathname === href ? 'text-primary' : 'text-foreground/75 hover:text-foreground'}`}
          aria-label={label}
          title={label}
        >
          <span className="inline-flex items-center gap-2">
            <Icon className="size-5 lg:size-4" weight="regular" />
            <span className="hidden lg:inline">{label}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}

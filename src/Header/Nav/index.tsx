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
          <div className="absolute top-full left-0 right-0 bg-background border-y border-border shadow-lg md:hidden z-50">
            <nav className="flex flex-col divide-y">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  onClick={() => setOpen(false)}
                  className={`py-6 px-3 text-sm font-medium transition-colors ${
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
    <nav className="flex items-stretch h-full divide-x border-x">
      {navLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          scroll={false}
          className={`relative isolate inline-flex h-full items-center justify-center px-6 lg:px-7 text-[15px] font-medium transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-foreground/12 before:opacity-0 before:scale-95 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:scale-100 ${
            pathname === href ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
          }`}
          aria-label={label}
          title={label}
        >
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <Icon className="size-5 lg:size-4" weight="fill" />
            <span className="hidden 2xl:inline">{label}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}

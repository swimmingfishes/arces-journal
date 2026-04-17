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
  LinkSimpleIcon,
  UsersThreeIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr'

const iconMap = {
  house: HouseIcon,
  images: ImagesIcon,
  info: InfoIcon,
  mailbox: MailboxIcon,
  news: NewspaperIcon,
  users: UsersThreeIcon,
  link: LinkSimpleIcon,
} as const

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]

const resolveHref = (item: HeaderNavItem) => {
  const link = item.link

  if (!link) return null
  if (link.type === 'custom') return link.url || null

  if (
    link.type === 'reference' &&
    link.reference &&
    typeof link.reference.value === 'object' &&
    'slug' in link.reference.value
  ) {
    const slug = link.reference.value.slug
    if (!slug) return null

    if (link.reference.relationTo === 'pages') {
      return slug === 'home' ? '/' : `/${slug}`
    }

    return `/${link.reference.relationTo}/${slug}`
  }

  return null
}

const normalizePath = (path: string) => {
  if (!path) return '/'
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
}

const buildNavLinks = (data: HeaderType) => {
  return (data.navItems || [])
    .map((item) => {
      const href = resolveHref(item)
      const label = item.link?.label

      if (!href || !label) return null

      return {
        href,
        label,
        icon: iconMap[item.icon || 'link'] || LinkSimpleIcon,
      }
    })
    .filter((item): item is { href: string; label: string; icon: typeof LinkSimpleIcon } =>
      Boolean(item),
    )
}

export const HeaderNav: React.FC<{ data: HeaderType; mobileOnly?: boolean }> = ({
  data,
  mobileOnly,
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navLinks = buildNavLinks(data)
  const currentPath = normalizePath(pathname)

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
                    currentPath === normalizePath(href)
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
            currentPath === normalizePath(href)
              ? 'text-primary'
              : 'text-foreground/80 hover:text-foreground'
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

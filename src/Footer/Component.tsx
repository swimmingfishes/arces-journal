import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-[#0a1628] dark:bg-background text-white relative overflow-hidden">
      <div className="relative z-10 mx-auto px-6 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
          {/* Logo + deskripsi */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              ARCES Open Journal System menyediakan akses terbuka ke jurnal-jurnal unggulan hasil
              penelitian sejawat dan pengabdian masyarakat di bidang komputasi, rekayasa, serta
              bisnis digital.
            </p>
          </div>

          {/* Jurnal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Jurnal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Jurnal Riset dan Teknologi
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Jurnal Pengembangan Teknologi
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Jurnal Pengabdian Masyarakat
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Jurnal Komputasi
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                IJECAR
              </Link>
            </nav>
          </div>

          {/* Navigasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Navigasi</h3>
            <nav className="flex flex-col gap-2">
              {navItems.length > 0 ? (
                navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  />
                ))
              ) : (
                <>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Academic
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Achievement
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Members
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ARCES Open Journal System. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Lembaga ARCES — Sistem Cerdas & Rekayasa Perangkat Lunak
          </p>
        </div>
      </div>
    </footer>
  )
}

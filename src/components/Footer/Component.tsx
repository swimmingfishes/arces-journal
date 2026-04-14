// import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
// import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  // const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="w-full page-gutter bg-background mt-auto">
      {/* Container Utama dengan Border Kiri-Kanan yang sejajar */}
      <div className="mx-auto md:border-x border-border">
        {/* Menggunakan Grid Cols 2 untuk membagi ruang sama rata (Equal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 px-8 py-16 md:border-t border-border">
          {/* SISI KIRI: ARCES & Deskripsi (50% lebar) */}
          <div className="flex flex-col gap-6 pr-8 lg:pr-20">
            <h2 className="font-sans font-bold text-gray-600 dark:text-stone-200 text-2xl">
              ARCES
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              ARCES adalah perusahaan publikasi yang berfokus pada pengembangan dan distribusi
              konten berkualitas di berbagai platform, baik cetak maupun digital.
            </p>
          </div>

          {/* SISI KANAN: Links & Newsletter (50% lebar) */}
          {/* Di dalamnya kita bagi lagi menjadi 3 kolom untuk link */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 lg:mt-0">
            {/* Kolom 1: Company */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-bold text-gray-600 dark:text-stone-200 text-xl">
                Company
              </h3>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  About
                </Link>
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </nav>
            </div>

            {/* Kolom 2: Product */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-bold text-gray-600 dark:text-stone-200 text-xl">
                Product
              </h3>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  Feature
                </Link>
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  Career
                </Link>
                <Link href="#" className="hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </nav>
            </div>

            {/* Kolom 3: Newsletter */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-bold text-gray-600 dark:text-stone-200 text-xl">
                Newsletter
              </h3>
              <p className="text-sm text-muted-foreground leading-snug">
                Get Updated to our latest news and journal releases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="bg-stone-50 dark:bg-background/50 border-t border-border px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            ©{new Date().getFullYear()} Arces. All rights reserved
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
            >
              Security
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}



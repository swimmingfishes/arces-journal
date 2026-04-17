import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import React from 'react'
import type { Footer as FooterType } from '@/payload-types'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const currentYear = new Date().getFullYear()

  const brandName = footerData.brandName || 'ARCES'
  const description =
    footerData.description ||
    'ARCES adalah perusahaan publikasi yang berfokus pada pengembangan dan distribusi konten berkualitas di berbagai platform, baik cetak maupun digital.'
  const copyright = footerData.copyrightText
    ? footerData.copyrightText.replace('{year}', String(currentYear))
    : `©${currentYear} ${brandName}. All rights reserved`

  return (
    <footer className="w-full mt-auto">
      <div className="mx-auto border-x border-border divide-y">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 border-t border-border" />

        {/* MAIN CONTENT: 
            Light Mode -> Gradient terang dari stone-50 ke stone-100/80
            Dark Mode  -> Gradient gelap dari zinc-900/80 ke zinc-950/90 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 py-20 bg-gradient-to-b from-stone-50 to-stone-100/80 dark:from-zinc-900/80 dark:to-zinc-950/90">
          {/* SISI KIRI: ARCES & Deskripsi */}
          <div className="flex flex-col gap-6 pr-8 lg:pr-20">
            <h2 className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-2xl">
              {brandName}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          {/* SISI KANAN: Links & Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 lg:mt-0">
            {(footerData.linkGroups || []).map((group, groupIndex) => (
              <div key={group.id || groupIndex} className="flex flex-col gap-4">
                <h3 className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-xl">
                  {group.title}
                </h3>
                <nav className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {(group.links || []).map((item, linkIndex) => (
                    <CMSLink
                      key={item.id || linkIndex}
                      {...item.link}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    />
                  ))}
                </nav>
              </div>
            ))}

            {/* Kolom 3: Newsletter */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-xl">
                {footerData.newsletterTitle || 'Newsletter'}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                {footerData.newsletterDescription ||
                  'Get updated to our latest news and journal releases.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 
            Light Mode -> Warna stone-100 yang solid dan bersih
            Dark Mode  -> Warna zinc-950/95 untuk menyatu dengan ujung gradient gelap
        */}
        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-stone-100 dark:bg-zinc-950/95">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{copyright}</p>

          <div className="flex flex-wrap justify-center gap-6">
            {(footerData.bottomLinks || []).map((item, linkIndex) => (
              <CMSLink
                key={item.id || linkIndex}
                {...item.link}
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

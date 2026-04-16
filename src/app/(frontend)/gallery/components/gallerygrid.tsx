'use client'

import { Media } from '@/components/Media'
import type { GalleryGridProps } from '../types'

export default function GalleryGrid({ loading, items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <div className="col-span-full px-8 py-10 text-center text-sm text-muted-foreground border-b border-border">
          Loading gallery...
        </div>
      ) : items.length === 0 ? (
        <div className="col-span-full px-8 py-10 text-center text-sm text-muted-foreground border-b border-border">
          No media found in gallery folder.
        </div>
      ) : (
        items.map((item, index) => {
          const totalInPage = items.length
          const remainder = totalInPage % 3
          const itemsInLastRow = remainder === 0 ? 3 : remainder
          const isLastRow = index >= totalInPage - itemsInLastRow

          return (
            <div
              key={item.id}
              className={`flex flex-col border-border
                      ${!isLastRow ? 'border-b' : ''} 
                      ${(index + 1) % 3 !== 0 ? 'lg:border-r' : ''} 
                      hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all group`}
            >
              {/* Image: Full-Bleed (Hapus Padding p-8) */}
              <div className="relative w-full aspect-4/3 bg-gray-100 dark:bg-zinc-900 overflow-hidden">
                <Media
                  resource={item}
                  fill
                  size="33vw"
                  className="w-full h-full"
                  pictureClassName="relative block w-full h-full"
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.alt || item.filename || 'Aktivitas penelitian atau pengabdian masyarakat.'}
                </p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

'use client'

import React from 'react'

const galleryImages = [
  { id: 1, src: '/path-to-image-1.jpg' },
  { id: 2, src: '/path-to-image-2.jpg' },
  { id: 3, src: '/path-to-image-3.jpg' },
  { id: 4, src: '/path-to-image-4.jpg' },
  { id: 5, src: '/path-to-image-5.jpg' },
  { id: 6, src: '/path-to-image-6.jpg' },
]

export function LandingGallery() {
  return (
    <section className="w-full px-6 lg:px-46 bg-background">
      <div className="mx-auto md:border-x border-gray-200 dark:border-white/10">
        {/* Header Section */}
        <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-blue-500">Media & Galery</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Featured Image & Description */}
          <div className="flex flex-col border-b lg:border-b-0 border-l border-r md:border-l-0 lg:border-r border-gray-200 dark:border-white/10 group">
            <div className="w-full aspect-video bg-gray-200 overflow-hidden">
              <img
                src="/path-to-main-gallery.jpg" // Gambar Gedung Udinus Besar
                alt="Main Gallery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                With a portfolio of over 2,700 journals and over 220,000 books, Springer is a global
                leader in academic and scientific publishing.
              </p>
            </div>
          </div>

          {/* RIGHT: 6 Small Images Grid (3x2) */}
          <div className="grid grid-cols-2 lg:grid-cols-2 border-l border-r md:border-l-0 md:border-r-0 border-gray-200 dark:border-white/10">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className={`aspect-video bg-gray-300 overflow-hidden border-b border-gray-200 dark:border-white/10 
                ${index % 2 === 0 ? 'border-r' : ''} 
                hover:opacity-80 transition-opacity cursor-pointer`}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${img.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

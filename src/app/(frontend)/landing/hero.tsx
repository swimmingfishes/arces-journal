'use client'
import React from 'react'
import { ParticlesBackground } from '@/components/ParticlesBackground'

export function LandingHero() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative mx-auto px-6 lg:px-32 py-6 md:py-10 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6 md:col-span-1 pt-8 lg:pt-32 mb-16">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
                Serving the global research
                <br />
                community
              </h1>
            </div>
            <p className="text-base leading-relaxed max-w-lg">
              With a portfolio of over 2,700 journals and over 230,000 books, Springer is a global
              leader in academic and scientific publishing. We provide open access trusted content,
              and collaborate with institutions and communities to advance knowledge worldwide.
              Whether you&apos;re publishing cutting-edge science or foundational texts, Springer
              provides the reach, credibility, and support to help your work make a lasting
              difference.
            </p>
          </div>
          {/* Placeholder for SVG/Image */}
        </div>
      </div>
    </section>
  )
}

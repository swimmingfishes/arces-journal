'use client'
import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { memo } from 'react'
import { useTheme } from 'next-themes'

export const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options = useCallback(() => {
    // Tentukan warna berdasarkan theme
    // Dark mode: Biru (#3B82F6 atau #60A5FA), Light mode: Abu-abu (#6B7280 atau #9CA3AF)
    const particleColor = resolvedTheme === 'dark' ? '#60A5FA' : '#6B7280'
    const linkColor = resolvedTheme === 'dark' ? '#60A5FA' : '#6B7280'
    const linkOpacity = resolvedTheme === 'dark' ? 0.3 : 0.2
    const particleOpacity =
      resolvedTheme === 'dark' ? { min: 0.2, max: 0.6 } : { min: 0.15, max: 0.4 }

    return {
      autoPlay: true,
      background: {
        color: { value: 'transparent' },
      },
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 120,
      interactivity: {
        detectsOn: 'window' as const,
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 400,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        bounce: {
          horizontal: { value: 1 },
          vertical: { value: 1 },
        },
        color: {
          value: particleColor,
        },
        links: {
          color: { value: linkColor },
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: linkOpacity,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none' as const,
          outModes: { default: 'bounce' as const },
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 100,
        },
        opacity: {
          value: particleOpacity,
          animation: {
            enable: true,
            speed: 3,
            sync: false,
          },
        },
        shape: { type: 'circle' },
        size: {
          value: { min: 1, max: 5 },
          animation: {
            enable: true,
            speed: 20,
            sync: false,
          },
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      zLayers: 1,
    }
  }, [resolvedTheme])

  // Prevent hydration mismatch
  if (!init || !mounted) return null

  return (
    <Particles
      id="tsparticles"
      options={options()}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  )
})

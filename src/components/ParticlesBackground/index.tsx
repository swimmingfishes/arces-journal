'use client'
import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { memo } from 'react'

export const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options = useCallback(
    () => ({
      autoPlay: true,
      background: {
        color: { value: 'transparent' }, // Biar ikut tema website
      },
      fullScreen: { enable: false }, // Penting: Biar gak nutupin seluruh page
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
            mode: 'grab', // Efek narik garis saat kursor mendekat
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
          value: '#3b82f6', // Warna biru shadcn/tailwind
        },
        links: {
          color: { value: '#3b82f6' },
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none' as const,
          outModes: { default: 'bounce' as const }, // Biar mantul di border kotak hero
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
          value: { min: 0.1, max: 0.5 },
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
    }),
    [],
  )

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      options={options()}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  )
})

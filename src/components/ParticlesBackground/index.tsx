'use client'
import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options = useCallback(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        detectsOn: 'window' as const,
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          onClick: {
            enable: false,
          },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4,
            speed: 1,
          },
        },
      },
      particles: {
        number: { value: 60 },
        color: { value: ['#007BFF', '#28A745'] },
        links: {
          enable: true,
          color: '#007BFF',
          distance: 120,
          opacity: 0.4,
          width: 0.8,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none' as const,
          random: true,
          outModes: { default: 'bounce' as const },
        },
        opacity: { value: 0.8 },
        size: { value: { min: 2, max: 4 } },
        shape: { type: 'circle' },
      },
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: { value: 20 },
              links: {
                distance: 100,
                opacity: 0.3,
                width: 0.5,
              },
              size: { value: { min: 1, max: 2 } },
            },
          },
        },
        {
          maxWidth: 1024,
          options: {
            particles: {
              number: { value: 40 },
            },
          },
        },
      ],
      detectRetina: true,
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
}

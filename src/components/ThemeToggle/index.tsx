'use client'
import React, { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@phosphor-icons/react'
import { useTheme } from '@/providers/Theme'
import { themeLocalStorageKey } from '@/providers/Theme/ThemeSelector/types'

export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setIsDark(preference === 'dark')
  }, [])

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
    setIsDark(!isDark)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  )
}

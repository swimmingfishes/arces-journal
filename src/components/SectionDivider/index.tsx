import React from 'react'
import { cn } from '@/components/lib/utils'

interface SectionDividerProps {
  title: string | React.ReactNode
  className?: string
  containerClassName?: string
  titleClassName?: string
}

export function SectionDivider({
  title,
  className,
  containerClassName,
  titleClassName,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        // Border atas-bawah (border-y) dan gradasi background (putih ke abu-abu muda)
        'w-full px-8 py-5 border-b bg-linear-to-r from-transparent to-yellow-600/5',
        // Styling untuk Dark Mode
        'dark:border-zinc-800 dark:from-transparent dark:to-sky-500/10',
        containerClassName,
        className,
      )}
    >
      <h2
        className={cn(
          'text-3xl font-serif [font-variation-settings:"wdth"_80] font-semibold text-black dark:text-white',
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  )
}

import React from 'react'
import { cn } from '@/components/lib/utils'

interface SectionDividerProps {
  title?: string | React.ReactNode
  id?: string
  className?: string
  containerClassName?: string
  titleClassName?: string
  children?: React.ReactNode
}

export function SectionDivider({
  title,
  id,
  className,
  containerClassName,
  titleClassName,
  children,
}: SectionDividerProps) {
  const hasTitle = Boolean(title)

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',

        'bg-linear-to-r from-transparent to-yellow-600/5 dark:from-transparent dark:to-sky-500/10',

        className,
      )}
    >
      {hasTitle && (
        <h2
          className={cn(
            'px-8 py-8 text-4xl font-serif [font-variation-settings:"wdth"_85] font-semibold text-black dark:text-white',
            titleClassName,
          )}
        >
          {title}
        </h2>
      )}

      {children}
    </section>
  )
}

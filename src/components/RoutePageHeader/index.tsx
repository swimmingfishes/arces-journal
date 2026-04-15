import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type RoutePageHeaderProps = {
  title: string
  description?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  centered?: boolean
}

export function RoutePageHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  centered = true,
}: RoutePageHeaderProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden px-8 py-16 min-h-60 border-b border-border',
        centered && 'text-center flex flex-col items-center justify-center',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-orange-200/40 to-transparent dark:from-sky-500/15" />

      <h1
        className={cn(
          'relative z-10 text-4xl md:text-7xl font-serif mb-8 font-light cursor-default [font-optical-sizing:auto] [font-variation-settings:"wdth"_100]',

          'transition-all duration-200 ease-out hover:font-semibold hover:tracking-tight hover:[font-variation-settings:"wdth"_115] hover:capitalize',
          titleClassName,
        )}
      >
        {title}
      </h1>

      {description ? (
        <div
          className={cn(
            'relative z-10 max-w-2xl text-muted-foreground leading-relaxed',
            descriptionClassName,
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}

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
        'px-8 py-16 min-h-60 border-b border-border',
        centered && 'text-center flex flex-col items-center justify-center',
        className,
      )}
    >
      <h1 className={cn('text-4xl md:text-7xl font-serif mb-8 font-light', titleClassName)}>
        {title}
      </h1>

      {description ? (
        <div
          className={cn('max-w-2xl text-muted-foreground leading-relaxed', descriptionClassName)}
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}

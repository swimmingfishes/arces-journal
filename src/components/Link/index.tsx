import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

import type { Page, News } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | React.ComponentProps<typeof Button>['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'news'
    value: Page | News | string | number
  } | null
  size?: React.ComponentProps<typeof Button>['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink = (props: CMSLinkType) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Link href={href || url || ''} {...newTabProps}>
      <Button
        className={className}
        size={sizeFromProps}
        variant={appearance}
      >
        {label && label}
        {children && children}
      </Button>
    </Link>
  )
}

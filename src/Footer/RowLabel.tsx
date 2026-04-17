'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<
    NonNullable<Footer['bottomLinks']>[number] | NonNullable<Footer['linkGroups']>[number]
  >()

  const groupTitle = 'title' in (data?.data || {}) ? data?.data?.title : undefined
  const linkLabel = 'link' in (data?.data || {}) ? data?.data?.link?.label : undefined

  const label = groupTitle
    ? `Group ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${groupTitle}`
    : linkLabel
      ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${linkLabel}`
      : 'Row'

  return <div>{label}</div>
}

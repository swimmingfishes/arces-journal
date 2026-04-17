'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<
    NonNullable<Footer['bottomLinks']>[number] | NonNullable<Footer['linkGroups']>[number]
  >()

  const rowData = data?.data

  const groupTitle =
    rowData &&
    typeof rowData === 'object' &&
    'title' in rowData &&
    typeof rowData.title === 'string'
      ? rowData.title
      : undefined

  const linkLabel =
    rowData &&
    typeof rowData === 'object' &&
    'link' in rowData &&
    rowData.link &&
    typeof rowData.link === 'object' &&
    'label' in rowData.link &&
    typeof rowData.link.label === 'string'
      ? rowData.link.label
      : undefined

  const label = groupTitle
    ? `Group ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${groupTitle}`
    : linkLabel
      ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${linkLabel}`
      : 'Row'

  return <div>{label}</div>
}

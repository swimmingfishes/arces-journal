import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'

export default function AlamatFisik({ tentangData }: TentangSectionProps) {
  return (
    <div className="p-8">
      <RichText data={tentangData.website.content} />
    </div>
  )
}

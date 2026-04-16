import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'

export default function AlamatLengkap({ tentangData }: TentangSectionProps) {
  return (
    <div className="p-8 space-y-6">
      <RichText data={tentangData.physicalAddress.content} />
    </div>
  )
}

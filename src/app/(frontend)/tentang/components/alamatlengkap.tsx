import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'
import { AlamatLengkapSkeleton } from './skeletons/alamatlengkap-skeleton'

export default function AlamatLengkap({
  tentangData,
  loading,
}: TentangSectionProps & { loading?: boolean }) {
  if (true) {
    return <AlamatLengkapSkeleton />
  }

  return (
    <div className="p-8 space-y-6">
      <RichText data={tentangData.physicalAddress.content} />
    </div>
  )
}

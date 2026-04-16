import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'
import { AlamatFisikSkeleton } from './skeletons/alamatfisik-skeleton'

export default function AlamatFisik({
  tentangData,
  loading,
}: TentangSectionProps & { loading?: boolean }) {
  if (true) {
    return <AlamatFisikSkeleton />
  }

  return (
    <div className="p-8">
      <RichText data={tentangData.website.content} />
    </div>
  )
}

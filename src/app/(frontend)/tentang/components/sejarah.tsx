import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'
import { SejarahSkeleton } from './skeletons/sejarah-skeleton'

export default function Sejarah({
  tentangData,
  loading,
}: TentangSectionProps & { loading?: boolean }) {
  if (loading) {
    return <SejarahSkeleton />
  }

  return (
    <section className="w-full p-8 flex flex-col">
      <div className="columns-1 md:columns-2 gap-16 divide-x">
        <RichText data={tentangData.sejarah.content} className="text-justify" />
      </div>
    </section>
  )
}

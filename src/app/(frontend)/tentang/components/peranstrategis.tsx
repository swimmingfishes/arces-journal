import type { Media, Tentang } from '@/payload-types'
import type { TentangSectionProps } from './types'
import { PeranStrategisSkeleton } from './skeletons/peranstrategis-skeleton'

function isMediaObject(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

export default function PeranStrategis({
  tentangData,
  loading,
}: TentangSectionProps & { loading?: boolean }) {
  if (loading) {
    return <PeranStrategisSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
      {tentangData.peranStrategis.cards?.map(
        (card: Tentang['peranStrategis']['cards'][number], index: number) => (
          <GridTextCard key={card.id || index} title={card.title} desc={card.description} />
        ),
      )}
    </div>
  )
}

function GridTextCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 border flex flex-col gap-4 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

import RichText from '@/components/RichText'
import type { TentangSectionProps } from './types'

export default function Sejarah({ tentangData }: TentangSectionProps) {
  return (
    <section className="w-full p-8 flex flex-col">
      <div className="columns-1 md:columns-2 gap-16 divide-x">
        <RichText data={tentangData.sejarah.content} />
      </div>
    </section>
  )
}

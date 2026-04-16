import RichText from '@/components/RichText'
import type { Tentang } from '@/payload-types'
import type { TentangSectionProps } from './types'

export default function VisiMisi({ tentangData }: TentangSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x">
      {/* Visi Section */}
      <div className="flex flex-col p-8 gap-6">
        <h3 className="text-2xl font-bold text-primary">Visi</h3>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
          {tentangData.visiMisi.visi && <RichText data={tentangData.visiMisi.visi} />}
        </div>
      </div>

      {/* Misi Section */}
      <div className="flex flex-col p-8 gap-6">
        <h3 className="text-2xl font-bold text-primary">Misi</h3>
        <ul className="space-y-6">
          {tentangData.visiMisi.misions?.map(
            (misi: Tentang['visiMisi']['misions'][number], index: number) => (
              <li key={misi.id || index} className="flex gap-5 items-start">
                <span className="shrink-0 mt-1 flex items-center justify-center w-11 h-11 bg-primary/10 text-primary font-mono border border-primary/20">
                  {String(index + 1)}
                </span>
                <p className="leading-relaxed text-foreground/90">{misi.text}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}

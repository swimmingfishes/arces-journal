import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import { SectionDivider } from '@/components/SectionDivider'
import type { Media, Tentang } from '@/payload-types'

function isMediaObject(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

export default async function TentangPage() {
  const payload = await getPayload({ config: configPromise })

  try {
    const tentang = await payload.findGlobal({
      slug: 'tentang',
      depth: 1,
    })

    if (!tentang) {
      return <div>Data tentang not found</div>
    }

    const tentangData: Tentang = tentang

    return (
      <main className="w-full bg-background min-h-screen">
        <section className="w-full page-gutter">
          <div className="mx-auto md:border-x border-border min-h-screen">
            <RoutePageHeader
              title="Tentang"
              description="Mengenal ARCES lebih dekat: sejarah, visi misi, serta peran strategis kami dalam pengembangan publikasi ilmiah."
            />

            {/* SEJARAH */}
            <SectionDivider title="Sejarah" />
            <div className="border-b">
              <div className="flex flex-col">
                <div className="p-8 pb-0">
                  <div className="w-full h-56 overflow-hidden relative group">
                    {tentangData.sejarah.image && isMediaObject(tentangData.sejarah.image) && (
                      <img
                        src={tentangData.sejarah.image.url || '/placeholder.jpg'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Sejarah ARCES"
                      />
                    )}
                    <div className="absolute bottom-0 right-0 bg-background px-6 py-3 rounded-tl-2xl">
                      <p className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-gray-700">
                        ARCES.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 pb-0 md:pb-8 space-y-6">
                  <div className="columns-1 md:columns-2 gap-8 md:[column-rule:1px_solid] md:[column-rule-color:rgb(229_231_235)] dark:md:[column-rule-color:rgb(255_255_255/0.1)] [&_p]:mb-6">
                    <RichText data={tentangData.sejarah.content} />
                  </div>
                </div>
              </div>
            </div>

            {/* VISI MISI */}
            <SectionDivider title="Visi & Misi" />
            <div className="grid grid-cols-1 md:grid-cols-2 border-b">
              <div className="flex flex-col md:border-r border-border">
                <div className="py-8 pb-0 md:pb-8 space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Visi</h3>
                  {tentangData.visiMisi.visi && <RichText data={tentangData.visiMisi.visi} />}
                </div>
              </div>
              <div className="p-8 pt-4 md:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
                <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
                  <h3 className="text-2xl font-bold text-primary">Misi</h3>
                  <ol className="list-none p-0 m-0 space-y-6">
                    {tentangData.visiMisi.misions?.map(
                      (misi: Tentang['visiMisi']['misions'][number], index: number) => (
                        <li key={index} className="flex gap-5 items-start">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/10 text-primary font-bold text-sm border border-primary/20 dark:border-primary/20">
                            {index + 1}
                          </span>
                          <p className="m-0 mt-0 leading-relaxed text-justify text-gray-700 dark:text-gray-300">
                            {misi.text}
                          </p>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              </div>
            </div>

            {/* PERAN STRATEGIS */}
            <SectionDivider title="Peran Strategis Arces" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tentangData.peranStrategis.cards?.map(
                (card: Tentang['peranStrategis']['cards'][number], index: number) => (
                  <GridTextCard key={index} title={card.title} desc={card.description} />
                ),
              )}

              {tentangData.peranStrategis.image &&
                isMediaObject(tentangData.peranStrategis.image) && (
                  <div className="lg:col-span-2 group relative flex overflow-hidden">
                    <div className="w-full h-full relative bg-gray-100">
                      <img
                        src={tentangData.peranStrategis.image.url || '/placeholder.jpg'}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="ARCES Strategic Role"
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* WEBSITE ADDRESS */}
            <SectionDivider title="Alamat lengkap website arces" />
            <div className="py-10 border-b border-border bg-zinc-50/5 dark:bg-transparent">
              <div className="max-w-none space-y-6">
                <RichText data={tentangData.website.content} />
              </div>
            </div>

            {/* PHYSICAL ADDRESS */}
            <SectionDivider title="Alamat lokasi fisik arces" />

            <div className="border-b">
              <div className="p-8 pb-0 md:pb-8 space-y-6">
                <RichText data={tentangData.physicalAddress.content} />
              </div>
            </div>

            {/* MAPS SECTION */}
            <SectionDivider title="Alamat via google maps" />

            <div className="flex flex-col">
              <div className="p-8 border-b border-border pb-8 lg:pb-12">
                <div className="w-full h-96 md:h-125 overflow-hidden relative group rounded-lg">
                  {tentangData.physicalAddress.mapsEmbedUrl ? (
                    <iframe
                      title="Lokasi Sekretariat ARCES"
                      src={tentangData.physicalAddress.mapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Map not available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error fetching tentang data:', error)
    return <div>Error loading tentang page</div>
  }
}

function GridTextCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 border-b border-r border-border flex flex-col gap-4 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">{desc}</p>
    </div>
  )
}

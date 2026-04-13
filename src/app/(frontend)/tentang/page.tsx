import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import RichText from '@/components/RichText'
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
        <section className="w-full px-6 lg:px-46">
          <div className="mx-auto md:border-x border-gray-200 dark:border-white/10 min-h-screen">
            {/* TOP BAR */}
            <div className="px-8 pt-10">
              <Link href="/">
                <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to home
                </Button>
              </Link>
            </div>

            {/* HEADER */}
            <div className="px-8 py-8 border-b border-gray-200 dark:border-white/10 mt-4">
              <h1 className="text-4xl font-extrabold tracking-tight">Tentang</h1>
            </div>

            {/* SEJARAH */}
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Sejarah</h2>
            </div>
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
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Visi & Misi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-b">
              <div className="flex flex-col md:border-r border-gray-200 dark:border-white/10">
                <div className="py-8 pb-0 md:pb-8 space-y-6">
                  <h2 className="text-2xl font-bold text-blue-500">Visi</h2>
                  {tentangData.visiMisi.visi && <RichText data={tentangData.visiMisi.visi} />}
                </div>
              </div>
              <div className="p-8 pt-4 md:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
                <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
                  <h2 className="text-2xl font-bold text-blue-500">Misi</h2>
                  <ol className="list-none p-0 m-0 space-y-6">
                    {tentangData.visiMisi.misions?.map(
                      (misi: Tentang['visiMisi']['misions'][number], index: number) => (
                        <li key={index} className="flex gap-5 items-start">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm border border-blue-100 dark:border-blue-900/30">
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
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Peran Strategis Arces</h2>
            </div>

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
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Alamat lengkap website arces</h2>
            </div>
            <div className="py-10 border-b border-gray-200 dark:border-white/10 bg-zinc-50/5 dark:bg-transparent">
              <div className="max-w-none space-y-6">
                <RichText data={tentangData.website.content} />
              </div>
            </div>

            {/* PHYSICAL ADDRESS */}
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Alamat lokasi fisik arces</h2>
            </div>

            <div className="border-b">
              <div className="p-8 pb-0 md:pb-8 space-y-6">
                <RichText data={tentangData.physicalAddress.content} />
              </div>
            </div>

            {/* MAPS SECTION */}
            <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-blue-500">Alamat via google maps</h2>
            </div>

            <div className="flex flex-col">
              <div className="p-8 border-b border-gray-200 dark:border-white/10 pb-8 lg:pb-12">
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
    <div className="p-8 border-b border-r border-gray-200 dark:border-white/10 flex flex-col gap-4 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">{desc}</p>
    </div>
  )
}

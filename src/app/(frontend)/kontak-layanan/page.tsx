import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Mail, MapPin, Phone, Zap, MessageSquare, ShieldCheck } from 'lucide-react'
import RichText from '@/components/RichText'
import { RoutePageHeader } from '@/components/RoutePageHeader'

const iconMap = {
  Zap: <Zap className="h-6 w-6 text-blue-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-blue-500" />,
  MessageSquare: <MessageSquare className="h-6 w-6 text-blue-500" />,
}

export default async function ContactServicePage() {
  const payload = await getPayload({ config: configPromise })

  try {
    const kontakLayanan = await payload.findGlobal({
      slug: 'kontakLayanan',
      depth: 1,
    })

    if (!kontakLayanan) {
      return <div>Data kontak & layanan not found</div>
    }

    return (
      <main className="w-full bg-background min-h-screen">
        <section className="w-full page-gutter">
          <div className="mx-auto md:border-x border-border min-h-screen">
            <RoutePageHeader
              title="Kontak & Layanan"
              description="Hubungi tim ARCES untuk kebutuhan layanan, informasi editorial, dan kolaborasi akademik."
            />

            {/* 3. SECTION LAYANAN (Grid Cards) */}
            <section>
              <div className="px-8 py-6 border-b  bg-zinc-50/30 dark:bg-zinc-900/10">
                <h2 className="text-2xl font-bold text-blue-500">
                  {kontakLayanan.layanan?.title || 'Our Services'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                {kontakLayanan.layanan?.services?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={iconMap[service.iconType as keyof typeof iconMap]}
                    title={service.title}
                    desc={service.description}
                    isLast={index === (kontakLayanan.layanan?.services?.length || 0) - 1}
                  />
                ))}
              </div>
            </section>

            {/* 4. SECTION KONTAK (Split Layout) */}
            <section className="border-t border-border ">
              <div className="px-8 py-6 border-b  bg-zinc-50/30 dark:bg-zinc-900/10">
                <h2 className="text-2xl font-bold text-blue-500">
                  {kontakLayanan.kontak?.title || 'Contact Information'}
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex-1 p-8 space-y-10 lg:border-r border-border">
                  <div className="space-y-8">
                    {kontakLayanan.kontak?.email && (
                      <ContactItem
                        icon={<Mail className="h-5 w-5" />}
                        label={kontakLayanan.kontak.emailLabel || 'Email Editorial'}
                        value={kontakLayanan.kontak.email}
                      />
                    )}
                    {kontakLayanan.kontak?.address && (
                      <ContactItem
                        icon={<MapPin className="h-5 w-5" />}
                        label={kontakLayanan.kontak.addressLabel || 'Office Location'}
                        value={kontakLayanan.kontak.address}
                      />
                    )}
                    {kontakLayanan.kontak?.phone && (
                      <ContactItem
                        icon={<Phone className="h-5 w-5" />}
                        label={kontakLayanan.kontak.phoneLabel || 'WhatsApp Support'}
                        value={kontakLayanan.kontak.phone}
                      />
                    )}
                  </div>
                </div>
                <div className="p-8 pt-4 lg:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
                  {(kontakLayanan.kontak as any)?.mapsEmbedUrl ? (
                    <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
                      <iframe
                        src={(kontakLayanan.kontak as any).mapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokasi ARCES"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                      {(kontakLayanan.kontak as any)?.rightContent ? (
                        <RichText data={(kontakLayanan.kontak as any).rightContent} />
                      ) : (
                        <p>
                          Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut tentang
                          layanan publikasi kami.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error fetching kontak & layanan data:', error)
    return <div>Error loading kontak & layanan page</div>
  }
}

// Sub-komponen agar kodingan rapi
function ServiceCard({
  icon,
  title,
  desc,
  isLast,
}: {
  icon: any
  title: string
  desc: string
  isLast: boolean
}) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col gap-4 border-b md:border-b-0 ${!isLast ? 'md:border-r border-border' : ''}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

function ContactItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-blue-500">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}



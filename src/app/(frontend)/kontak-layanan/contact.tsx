import type { ReactNode } from 'react'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import type { KontakLayanan } from '@/payload-types'
import RichText from '@/components/RichText'

type ContactProps = {
  kontakLayanan: KontakLayanan
}

export default function Contact({ kontakLayanan }: ContactProps) {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex-1 space-y-10 p-8 lg:border-r border-border">
          <div className="space-y-8">
            {kontakLayanan.kontak?.email && (
              <ContactItem
                icon={<EnvelopeIcon className="h-5 w-5" />}
                label={kontakLayanan.kontak.emailLabel || 'Email Editorial'}
                value={kontakLayanan.kontak.email}
              />
            )}
            {kontakLayanan.kontak?.address && (
              <ContactItem
                icon={<MapPinIcon className="h-5 w-5" />}
                label={kontakLayanan.kontak.addressLabel || 'Office Location'}
                value={kontakLayanan.kontak.address}
              />
            )}
            {kontakLayanan.kontak?.phone && (
              <ContactItem
                icon={<PhoneIcon className="h-5 w-5" />}
                label={kontakLayanan.kontak.phoneLabel || 'WhatsApp Support'}
                value={kontakLayanan.kontak.phone}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-6 bg-zinc-50/10 p-8 pt-4 lg:pt-8">
          {kontakLayanan.kontak?.mapsEmbedUrl ? (
            <div className="h-96 w-full overflow-hidden rounded-lg border border-border">
              <iframe
                src={kontakLayanan.kontak.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi ARCES"
              />
            </div>
          ) : (
            <div className="prose max-w-none space-y-6 text-justify leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300">
              {kontakLayanan.kontak?.rightContent ? (
                <RichText data={kontakLayanan.kontak.rightContent} />
              ) : (
                <p>
                  Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut tentang layanan
                  publikasi kami.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-primary">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

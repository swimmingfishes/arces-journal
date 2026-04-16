import type { ReactNode } from 'react'
import { EnvelopeIcon, InstagramLogoIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import type { KontakLayanan } from '@/payload-types'

type ContactProps = {
  kontakLayanan: KontakLayanan
}

export default function Contact({ kontakLayanan }: ContactProps) {
  // Kita buat array dari data kontak agar mudah di-map seperti pada Services
  const contacts = [
    ...(kontakLayanan.kontak?.email
      ? [
          {
            id: 'email',
            icon: <EnvelopeIcon className="h-6 w-6 text-primary" />,
            label: kontakLayanan.kontak.emailLabel || 'Alamat Email Kontak',
            value: kontakLayanan.kontak.email,
          },
        ]
      : []),
    ...(kontakLayanan.kontak?.phone
      ? [
          {
            id: 'phone',
            icon: <PhoneIcon className="h-6 w-6 text-primary" />,
            label: kontakLayanan.kontak.phoneLabel || 'Nomor Telepon Kontak',
            value: kontakLayanan.kontak.phone,
          },
        ]
      : []),
    ...(kontakLayanan.kontak?.address
      ? [
          {
            id: 'address',
            icon: <InstagramLogoIcon className="h-6 w-6 text-primary" />,
            label: kontakLayanan.kontak.addressLabel || 'Office Location',
            value: kontakLayanan.kontak.address,
          },
        ]
      : []),
  ]

  return (
    <section>
      {/* Menggunakan grid 3 kolom yang persis dengan Services */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {contacts.map((contact, index) => (
          <ContactCard
            key={contact.id}
            icon={contact.icon}
            label={contact.label}
            value={contact.value}
            isLast={index === contacts.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

// Sub-komponen yang layout dan class-nya 100% meng-copy ServiceCard
function ContactCard({
  icon,
  label,
  value,
  isLast,
}: {
  icon: ReactNode
  label: string
  value: string
  isLast: boolean
}) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col gap-4 ${!isLast ? 'md:border-r border-border' : ''}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{label}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
    </div>
  )
}

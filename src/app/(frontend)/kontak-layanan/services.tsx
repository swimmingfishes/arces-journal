import type { ReactNode } from 'react'
import { ChatCircleTextIcon, LightningIcon, ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr'
import type { KontakLayanan } from '@/payload-types'

const iconMap = {
  Zap: <LightningIcon className="h-6 w-6 text-primary" />,
  ShieldCheck: <ShieldCheckIcon className="h-6 w-6 text-primary" />,
  MessageSquare: <ChatCircleTextIcon className="h-6 w-6 text-primary" />,
}

type ServicesProps = {
  kontakLayanan: KontakLayanan
}

export default function Services({ kontakLayanan }: ServicesProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {kontakLayanan.layanan?.services?.map((service, index) => (
          <ServiceCard
            key={service.id || index}
            icon={iconMap[service.iconType as keyof typeof iconMap]}
            title={service.title}
            desc={service.description}
            isLast={index === (kontakLayanan.layanan?.services?.length || 0) - 1}
          />
        ))}
      </div>
    </section>
  )
}

// Sub-komponen agar kodingan rapi
function ServiceCard({
  icon,
  title,
  desc,
  isLast,
}: {
  icon: ReactNode
  title: string
  desc: string
  isLast: boolean
}) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col gap-4 ${!isLast ? 'md:border-r border-border' : ''}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

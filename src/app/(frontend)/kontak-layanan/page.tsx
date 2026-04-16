import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import { SectionDivider } from '@/components/SectionDivider'
import type { KontakLayanan } from '@/payload-types'
import Contact from './contact'
import Services from './services'

export default async function ContactServicePage() {
  const payload = await getPayload({ config: configPromise })

  try {
    const kontakLayanan = (await payload.findGlobal({
      slug: 'kontakLayanan',
      depth: 1,
    })) as KontakLayanan

    if (!kontakLayanan) {
      return <div>Data kontak & layanan not found</div>
    }

    return (
      <main className="w-full divide-y">
        <RoutePageHeader
          title="Kontak & Layanan"
          description="Hubungi tim ARCES untuk kebutuhan layanan, informasi editorial, dan kolaborasi akademik."
        />
        <SectionDivider title="Our Services" />
        <Services kontakLayanan={kontakLayanan} />
        <SectionDivider title="Contact" />
        <Contact kontakLayanan={kontakLayanan} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching kontak & layanan data:', error)
    return <div>Error loading kontak & layanan page</div>
  }
}

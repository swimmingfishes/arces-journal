import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RoutePageHeader } from '@/components/RoutePageHeader'
import { SectionDivider } from '@/components/SectionDivider'
import type { Tentang } from '@/payload-types'
import Sejarah from './components/sejarah'
import VisiMisi from './components/visimisi'
import AlamatFisik from './components/alamatfisik'
import AlamatLengkap from './components/alamatlengkap'
import PeranStrategis from './components/peranstrategis'
import AlamatMaps from './components/alamatmaps'

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
      <main className="w-full divide-y">
        <RoutePageHeader
          title="Tentang"
          description="Mengenal ARCES lebih dekat: sejarah, visi misi, serta peran strategis kami dalam pengembangan publikasi ilmiah."
        />
        <SectionDivider title="Sejarah" />
        <Sejarah tentangData={tentangData} />
        <SectionDivider title="Visi & Misi" />
        <VisiMisi tentangData={tentangData} />
        <SectionDivider title="Peran Strategis Arces" />
        <PeranStrategis tentangData={tentangData} />
        <SectionDivider title="Alamat lengkap website arces" />
        <AlamatLengkap tentangData={tentangData} />
        <SectionDivider title="Alamat lokasi fisik arces" />
        <AlamatFisik tentangData={tentangData} />
        <SectionDivider title="Alamat via google maps" />
        <AlamatMaps tentangData={tentangData} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching tentang data:', error)
    return <div>Error loading tentang page</div>
  }
}

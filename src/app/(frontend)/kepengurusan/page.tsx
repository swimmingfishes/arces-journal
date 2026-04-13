import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClientContent from './page.client'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(enLocale)

export default async function KepengurusanPage() {
  const payload = await getPayload({ config: configPromise })

  try {
    const response = await payload.find({
      collection: 'peoples',
      depth: 1,
      pagination: false,
      select: {
        id: true,
        name: true,
        instation: true,
        country: true,
        role: true,
        heroImage: true,
        links: true,
      },
    })

    const allMembers = (response.docs || []).map((person: any) => ({
      id: person.id,
      name: person.name,
      university: person.instation,
      country: countries.getName(person.country, 'en') || person.country,
      image: typeof person.heroImage === 'object' ? person.heroImage.url : '/placeholder.jpg',
      role: typeof person.role === 'object' ? person.role.slug : person.role,
      links: person.links || [],
    }))

    return <PageClientContent allMembers={allMembers} />
  } catch (error) {
    console.error('Error fetching people:', error)
    return <PageClientContent allMembers={[]} />
  }
}

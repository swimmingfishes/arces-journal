import configPromise from '@payload-config'
import { getPayload } from 'payload'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

import PageClientContent from './page.client'
import type { Member } from './types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { People, Role } from '@/payload-types'

countries.registerLocale(enLocale)

export default async function KepengurusanPage() {
  const payload = await getPayload({ config: configPromise })
  const pinnedMemberName = 'eko hari rachmawanto'

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
        image: true,
        externalImageUrl: true,
        links: true,
      },
    })

    const allMembers: Member[] = (response.docs || [])
      .map((person: People) => {
        const imageUrl =
          person.image && typeof person.image === 'object' && person.image.url
            ? getMediaUrl(person.image.url)
            : person.image

        const roles: string[] = Array.isArray(person.role)
          ? person.role.flatMap((role: number | Role) => {
              if (!role) return []
              return [typeof role === 'object' ? role.slug : String(role)]
            })
          : []

        return {
          id: person.id,
          name: person.name,
          university: person.instation,
          instation: person.instation,
          country: countries.getName(person.country, 'en') || person.country,
          image: imageUrl,
          externalImageUrl: person.externalImageUrl,
          roles,
          links: person.links || [],
        }
      })
      .sort((a, b) => {
        const aPinned = a.name?.trim().toLowerCase() === pinnedMemberName
        const bPinned = b.name?.trim().toLowerCase() === pinnedMemberName

        if (aPinned === bPinned) return 0
        return aPinned ? -1 : 1
      })

    return <PageClientContent allMembers={allMembers} />
  } catch (error) {
    console.error('Error fetching people:', error)
    return <PageClientContent allMembers={[]} />
  }
}

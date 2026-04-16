import type { Media } from '@/payload-types'

export type MemberLink = {
  label: string
  url: string
}

export type Member = {
  id: string | number
  name: string
  university: string
  country: string
  instation: string
  image?: number | Media | string | null
  externalImageUrl?: string | null
  roles: string[]
  links?: MemberLink[]
}

/**
 * Resolves the image URL from either uploaded media or external URL
 * Priority: externalImageUrl > media image > fallback
 */
export function getMemberImageUrl(member: Member): string {
  // Use external URL if provided
  if (member.externalImageUrl) {
    return member.externalImageUrl
  }

  // Accept pre-resolved image URL string
  if (typeof member.image === 'string' && member.image) {
    return member.image
  }

  // Use uploaded media if available
  if (member.image && typeof member.image !== 'number') {
    const media = member.image as Media
    if (media.url) return media.url
  }

  // No image source available; UI should render icon fallback.
  return ''
}

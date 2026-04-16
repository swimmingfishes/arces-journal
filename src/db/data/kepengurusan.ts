import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

import rawData from './kepengurusan.json'

countries.registerLocale(enLocale)

type RawLink = {
  label?: string
  url?: string
}

type RawPerson = {
  name?: string
  instation?: string
  country?: string
  roles?: string[]
  role?: string
  externalImageUrl?: string
  links?: RawLink[]
}

export type RoleSeedData = {
  name: string
  slug: string
}

export type KepengurusanSeedData = {
  name: string
  instation: string
  country: string
  roleSlugs: string[]
  externalImageUrl?: string
  links?: {
    label: string
    url: string
  }[]
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const slugToDisplayName = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')

const normalizeUrl = (value?: string): string => {
  if (!value) return ''

  return value.trim().replace(/^"|"$/g, '').replace(/'$/g, '').replace(/&amp;/g, '&')
}

const isValidUrl = (value: string) => {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const countryNameToCode = (countryName: string): string | null => {
  const normalized = countryName.trim()
  if (!normalized) return null

  const direct = countries.getAlpha2Code(normalized, 'en')
  if (direct) return direct

  const aliases: Record<string, string> = {
    'United States': 'US',
    Indonesia: 'ID',
    Malaysia: 'MY',
    Nigeria: 'NG',
    Iraq: 'IQ',
  }

  return aliases[normalized] || null
}

export const getRoleSeedData = (): RoleSeedData[] => {
  const unique = new Map<string, RoleSeedData>()

  for (const row of rawData as RawPerson[]) {
    const roleCandidates = [
      ...(row.roles || []).map((r) => toSlug((r || '').trim())),
      toSlug((row.role || '').trim()),
    ].filter(Boolean)

    for (const slug of roleCandidates) {
      if (unique.has(slug)) continue

      unique.set(slug, {
        name: slugToDisplayName(slug),
        slug,
      })
    }
  }

  return Array.from(unique.values())
}

export const getKepengurusanSeedData = (): KepengurusanSeedData[] => {
  const rows = rawData as RawPerson[]
  const unique = new Map<string, KepengurusanSeedData>()

  for (const row of rows) {
    const name = (row.name || '').trim()
    const instation = (row.instation || '').trim()
    const countryCode = countryNameToCode(row.country || '')
    const externalImageUrl = normalizeUrl(row.externalImageUrl)

    const roleSlugs = Array.from(
      new Set(
        [
          ...(row.roles || []).map((role) => toSlug((role || '').trim())),
          toSlug((row.role || '').trim()),
        ].filter(Boolean),
      ),
    )

    if (!name || !instation || roleSlugs.length === 0 || !countryCode) continue

    const links = (row.links || [])
      .map((link) => ({
        label: (link.label || '').trim(),
        url: normalizeUrl(link.url),
      }))
      .filter((link) => link.label && link.url && isValidUrl(link.url))

    const key = `${name}::${instation}::${countryCode}`
    if (unique.has(key)) continue

    unique.set(key, {
      name,
      instation,
      country: countryCode,
      roleSlugs,
      ...(externalImageUrl && isValidUrl(externalImageUrl) ? { externalImageUrl } : {}),
      ...(links.length > 0 ? { links } : {}),
    })
  }

  return Array.from(unique.values())
}

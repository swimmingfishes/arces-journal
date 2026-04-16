import rawData from './jurnal.json'

type JournalSeedInput = {
  title?: string
  description?: string
  link?: string
  colors?: {
    primary?: string
    secondary?: string
    accent?: string
  }
}

export type JournalSeedData = {
  title: string
  description: string
  link: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

const isHex = (value: string) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)

const isValidJournal = (item: JournalSeedInput): item is JournalSeedData => {
  if (!item.title?.trim()) return false
  if (!item.description?.trim()) return false
  if (!item.link?.trim()) return false

  const primary = item.colors?.primary?.trim() || ''
  const secondary = item.colors?.secondary?.trim() || ''
  const accent = item.colors?.accent?.trim() || ''

  return isHex(primary) && isHex(secondary) && isHex(accent)
}

export const getJurnalSeedData = (): JournalSeedData[] => {
  return (rawData as JournalSeedInput[]).filter(isValidJournal).map((item) => ({
    title: item.title.trim(),
    description: item.description.trim(),
    link: item.link.trim(),
    colors: {
      primary: item.colors!.primary!.trim(),
      secondary: item.colors!.secondary!.trim(),
      accent: item.colors!.accent!.trim(),
    },
  }))
}

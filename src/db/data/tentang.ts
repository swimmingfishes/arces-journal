import data from './tentang.json'

const textToLexicalState = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
      },
    ],
  },
})

const textBlockToLexicalState = (text: string) => {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  if (paragraphs.length === 0) {
    return textToLexicalState('')
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((paragraph) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph,
            version: 1,
          },
        ],
      })),
    },
  }
}

const joinTextParts = (...parts: Array<string | undefined>) =>
  parts
    .map((part) => (part || '').trim())
    .filter(Boolean)
    .join('\n\n')

export const getTentangSeedData = () => {
  const tentang = data.tentang as any
  const sejarahContent =
    tentang.sejarah.content ||
    joinTextParts(
      tentang.sejarah.leftParagraph1,
      tentang.sejarah.leftParagraph2,
      tentang.sejarah.rightParagraph1,
      tentang.sejarah.rightParagraph2,
      tentang.sejarah.rightParagraph3,
    )

  const websiteContent =
    tentang.website.content ||
    joinTextParts(
      tentang.website.paragraph1,
      tentang.website.paragraph2,
      tentang.website.paragraph3,
    )

  const physicalAddressContent =
    tentang.physicalAddress.content ||
    joinTextParts(
      tentang.physicalAddress.leftParagraph1,
      tentang.physicalAddress.leftParagraph2,
      tentang.physicalAddress.rightParagraph1,
      tentang.physicalAddress.rightParagraph2,
      tentang.physicalAddress.mapLeftParagraph1,
      tentang.physicalAddress.mapLeftParagraph2,
      tentang.physicalAddress.mapLeftParagraph3,
      tentang.physicalAddress.mapRightParagraph1,
      tentang.physicalAddress.mapRightParagraph2,
      tentang.physicalAddress.mapRightParagraph3,
    )

  return {
    sejarah: {
      content: textBlockToLexicalState(sejarahContent),
    },
    visiMisi: {
      visi: textToLexicalState(tentang.visiMisi.visi),
      misions: tentang.visiMisi.misions,
    },
    peranStrategis: {
      cards: tentang.peranStrategis.cards,
    },
    website: {
      content: textBlockToLexicalState(websiteContent),
    },
    physicalAddress: {
      content: textBlockToLexicalState(physicalAddressContent),
      mapsEmbedUrl: tentang.physicalAddress.mapsEmbedUrl,
    },
  }
}

export const getKontakLayananSeedData = () => {
  const kontakLayanan = data.kontakLayanan

  return {
    header: {
      title: kontakLayanan.header.title,
      description: textToLexicalState(kontakLayanan.header.description),
    },
    layanan: {
      title: kontakLayanan.layanan.title,
      services: kontakLayanan.layanan.services,
    },
    kontak: {
      title: kontakLayanan.kontak.title,
      email: kontakLayanan.kontak.email,
      emailLabel: kontakLayanan.kontak.emailLabel,
      address: kontakLayanan.kontak.address,
      addressLabel: kontakLayanan.kontak.addressLabel,
      phone: kontakLayanan.kontak.phone,
      phoneLabel: kontakLayanan.kontak.phoneLabel,
      mapsEmbedUrl: kontakLayanan.kontak.mapsEmbedUrl,
      rightContent: textToLexicalState(kontakLayanan.kontak.rightContent),
    },
  }
}

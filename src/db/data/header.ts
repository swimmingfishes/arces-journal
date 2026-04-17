import type { Header } from '@/payload-types'

export const getHeaderSeedData = (): Partial<Header> => {
  return {
    brandName: 'ARCES',
    navItems: [
      {
        link: {
          type: 'custom',
          label: 'Home',
          url: '/',
        },
        icon: 'house',
      },
      {
        link: {
          type: 'custom',
          label: 'Tentang',
          url: '/tentang',
        },
        icon: 'info',
      },
      {
        link: {
          type: 'custom',
          label: 'Kepengurusan',
          url: '/kepengurusan',
        },
        icon: 'users',
      },
      {
        link: {
          type: 'custom',
          label: 'News',
          url: '/news',
        },
        icon: 'news',
      },
      {
        link: {
          type: 'custom',
          label: 'Gallery',
          url: '/gallery',
        },
        icon: 'images',
      },
      {
        link: {
          type: 'custom',
          label: 'Kontak dan layanan',
          url: '/kontak-layanan',
        },
        icon: 'mailbox',
      },
    ],
  }
}

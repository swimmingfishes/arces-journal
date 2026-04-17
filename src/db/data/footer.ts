import type { Footer } from '@/payload-types'

export const getFooterSeedData = (): Partial<Footer> => {
  return {
    brandName: 'ARCES',
    description:
      'ARCES adalah perusahaan publikasi yang berfokus pada pengembangan dan distribusi konten berkualitas di berbagai platform, baik cetak maupun digital.',
    linkGroups: [
      {
        title: 'Company',
        links: [
          {
            link: {
              type: 'custom',
              label: 'Home',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'About',
              url: '/tentang',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/news',
            },
          },
        ],
      },
      {
        title: 'Product',
        links: [
          {
            link: {
              type: 'custom',
              label: 'Feature',
              url: '#',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Career',
              url: '#',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/news',
            },
          },
        ],
      },
    ],
    newsletterTitle: 'Newsletter',
    newsletterDescription: 'Get Updated to our latest news and journal releases.',
    bottomLinks: [
      {
        link: {
          type: 'custom',
          label: 'Privacy Policy',
          url: '#',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Terms of Service',
          url: '#',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Security',
          url: '#',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Cookie',
          url: '#',
        },
      },
    ],
    copyrightText: '©{year} Arces. All rights reserved',
  }
}

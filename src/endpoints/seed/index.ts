import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { image3 } from './image-3'
import { imageHero1 } from './image-hero-1'
import { post1 as news1 } from './post-1'
import { post2 as news2 } from './post-2'
import { post3 as news3 } from './post-3'
import { fetchFileByURL } from '../../db/utils'
import { getKontakLayananSeedData, getTentangSeedData } from '../../db/data/tentang'
import { getJurnalSeedData } from '../../db/data/jurnal'
import { getKepengurusanSeedData, getRoleSeedData } from '../../db/data/kepengurusan'
import { getHeaderSeedData } from '../../db/data/header'
import { getFooterSeedData } from '../../db/data/footer'

const collections: CollectionSlug[] = [
  'media',
  'pages',
  'news',
  'search',
  'journals',
  'roles',
  'peoples',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data:
          global === 'header'
            ? ({
                brandName: '',
                navItems: [],
              } as any)
            : ({
                brandName: '',
                description: '',
                linkGroups: [],
                newsletterTitle: '',
                newsletterDescription: '',
                bottomLinks: [],
                copyrightText: '',
              } as any),
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image3,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
  ])

  payload.logger.info(`— Seeding news...`)

  // Do not create news with `Promise.all` because we want the news to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  await payload.create({
    collection: 'news',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: news1({ heroImage: image1Doc, blockImage: image2Doc }),
  })

  await payload.create({
    collection: 'news',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: news2({ heroImage: image2Doc, blockImage: image3Doc }),
  })

  await payload.create({
    collection: 'news',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: news3({ heroImage: image3Doc, blockImage: image1Doc }),
  })

  payload.logger.info(`— Seeding pages...`)

  await payload.create({
    collection: 'pages',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
  })

  payload.logger.info(`— Seeding journals...`)

  const jurnalSeedData = getJurnalSeedData()
  for (const jurnal of jurnalSeedData) {
    await payload.create({
      collection: 'journals',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: jurnal,
    })
  }

  payload.logger.info(`— Seeding roles and peoples...`)

  const roleSeedData = getRoleSeedData()
  const roleIdBySlug = new Map<string, number | string>()

  for (const role of roleSeedData) {
    const roleDoc = await payload.create({
      collection: 'roles',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: role,
    })

    roleIdBySlug.set(role.slug, roleDoc.id)
  }

  const peopleSeedData = getKepengurusanSeedData()
  for (const person of peopleSeedData) {
    const roleIds = person.roleSlugs
      .map((slug) => roleIdBySlug.get(slug))
      .filter((id): id is string | number => Boolean(id))

    if (roleIds.length === 0) continue

    await payload.create({
      collection: 'peoples',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: {
        name: person.name,
        instation: person.instation,
        country: person.country,
        role: roleIds,
        ...(person.externalImageUrl ? { externalImageUrl: person.externalImageUrl } : {}),
        ...(person.links?.length ? { links: person.links } : {}),
      },
    })
  }

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      context: {
        disableRevalidate: true,
      },
      data: getHeaderSeedData() as any,
    }),
    payload.updateGlobal({
      slug: 'footer',
      context: {
        disableRevalidate: true,
      },
      data: getFooterSeedData() as any,
    }),
  ])

  // Seed tentang (about) global with comprehensive content
  await payload.updateGlobal({
    slug: 'tentang',
    data: getTentangSeedData() as any,
    depth: 0,
    context: {
      disableRevalidate: true,
    },
  })

  // Seed kontak & layanan (contact & services) global
  await payload.updateGlobal({
    slug: 'kontakLayanan',
    data: getKontakLayananSeedData() as any,
    depth: 0,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Seeded database successfully!')
}

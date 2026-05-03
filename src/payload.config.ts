import { sqliteAdapter } from '@payloadcms/db-sqlite'

// import { id } from '@payloadcms/translations/languages/id'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { News } from './collections/News'
import { Users } from './collections/Users'
import { Peoples } from './collections/People'
import { Journals } from './collections/Journals'
import { Roles } from './collections/Roles'

import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Tentang } from './globals/Tentang'
import { KontakLayanan } from './globals/KontakLayanan'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      description: 'The best admin panel in the world',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
      titleSuffix: '- Arces',
    },
    components: {
      graphics: {
        Logo: '/graphics/Logo',
        Icon: '/graphics/Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URL || '',
  //   },
  // }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
  }),
  collections: [Pages, News, Media, Roles, Peoples, Journals, Users],
  cors: [getServerSideURL()].filter(Boolean),
  // i18n: {
  //   supportedLanguages: { id },
  // },
  globals: [Header, Footer, Tentang, KontakLayanan],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { id } from '@payloadcms/translations/languages/id'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Peoples } from './collections/People'
import { Journals } from './collections/Journals'
import { News } from './collections/News'
import { Roles } from './collections/Roles'
import { plugins } from './plugins'
import { Footer } from './Footer/config'
import { Header } from './Header/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer],
  collections: [Users, Media, Roles, Peoples, Journals, News],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  // plugin SEO tidak support bahasa Indonesia
  // i18n: {
  //   supportedLanguages: { id},
  // },
  sharp,
  plugins,
})

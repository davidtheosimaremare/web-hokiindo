import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Projects } from './collections/Projects'
import { Careers } from './collections/Careers'
import { Profile } from './globals/Profile'
import { Beranda } from './globals/Beranda'
import { About } from './globals/About'
import { ProjectsPage } from './globals/ProjectsPage'
import { CareersPage } from './globals/CareersPage'
import { ContactPage } from './globals/ContactPage'
import { NewsPage } from './globals/NewsPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, News, Projects, Careers],
  globals: [Profile, Beranda, About, ProjectsPage, CareersPage, ContactPage, NewsPage],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})

import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

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
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.MINIO_BUCKET || 'hokiindo',
      config: {
        endpoint: process.env.MINIO_ENDPOINT || 'https://assets.hokiindo.co.id',
        credentials: {
          accessKeyId: process.env.MINIO_ACCESS_KEY || '',
          secretAccessKey: process.env.MINIO_SECRET_KEY || '',
        },
        region: 'us-east-1', // MinIO requires a region, us-east-1 is the default
        forcePathStyle: true, // Required for MinIO compatibility
      },
    }),
  ],
})

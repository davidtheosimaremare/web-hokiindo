import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { News } from './collections/News.ts'
import { Projects } from './collections/Projects.ts'
import { Careers } from './collections/Careers.ts'
import { Profile } from './globals/Profile.ts'
import { Beranda } from './globals/Beranda.ts'
import { About } from './globals/About.ts'
import { ProjectsPage } from './globals/ProjectsPage.ts'
import { CareersPage } from './globals/CareersPage.ts'
import { ContactPage } from './globals/ContactPage.ts'
import { NewsPage } from './globals/NewsPage.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getEnv = (key: string, fallback: string = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback
  }
  return fallback
}

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, News, Projects, Careers],
  globals: [Profile, Beranda, About, ProjectsPage, CareersPage, ContactPage, NewsPage],
  editor: lexicalEditor({}),
  secret: getEnv('PAYLOAD_SECRET', 'fallback-secret'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: getEnv('DATABASE_URI'),
    },
    push: true,
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const endpoint = 'https://assets.hokiindo.co.id'
            const bucket = 'hokiindo'
            return `${endpoint}/${bucket}/${prefix ? `${prefix}/` : ''}${filename}`
          },
        },
      },
      bucket: getEnv('MINIO_BUCKET', 'hokiindo'),
      config: {
        endpoint: getEnv('MINIO_ENDPOINT', 'https://assets.hokiindo.co.id'),
        credentials: {
          accessKeyId: getEnv('MINIO_ACCESS_KEY'),
          secretAccessKey: getEnv('MINIO_SECRET_KEY'),
        },
        region: 'us-east-1', // MinIO requires a region, us-east-1 is the default
        forcePathStyle: true, // Required for MinIO compatibility
      },
    }),
  ],
})

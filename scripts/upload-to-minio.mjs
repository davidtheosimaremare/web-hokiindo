/**
 * Script to upload all existing files from public/media to MinIO
 * Run: node scripts/upload-to-minio.mjs
 */

import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { lookup } from 'mime-types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MinIO Configuration (from .env or hardcoded for this script)
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'https://assets.hokiindo.co.id'
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'admin'
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'hokiindojaya123@'
const MINIO_BUCKET = process.env.MINIO_BUCKET || 'shop'

const s3 = new S3Client({
  endpoint: MINIO_ENDPOINT,
  credentials: {
    accessKeyId: MINIO_ACCESS_KEY,
    secretAccessKey: MINIO_SECRET_KEY,
  },
  region: 'us-east-1',
  forcePathStyle: true,
})

const mediaDir = path.resolve(__dirname, '../public/media')

async function checkBucketExists() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: MINIO_BUCKET }))
    console.log(`✅ Bucket "${MINIO_BUCKET}" ditemukan dan dapat diakses.`)
    return true
  } catch (err) {
    console.error(`❌ Bucket "${MINIO_BUCKET}" tidak ditemukan atau tidak dapat diakses:`, err.message)
    return false
  }
}

async function uploadFile(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath)
  const mimeType = lookup(fileName) || 'application/octet-stream'

  const command = new PutObjectCommand({
    Bucket: MINIO_BUCKET,
    Key: fileName,
    Body: fileContent,
    ContentType: mimeType,
    ACL: 'public-read', // Make file publicly accessible
  })

  try {
    await s3.send(command)
    console.log(`  ✅ Berhasil: ${fileName}`)
    return true
  } catch (err) {
    console.error(`  ❌ Gagal: ${fileName} — ${err.message}`)
    return false
  }
}

async function main() {
  console.log('🚀 Memulai upload file ke MinIO...')
  console.log(`   Endpoint : ${MINIO_ENDPOINT}`)
  console.log(`   Bucket   : ${MINIO_BUCKET}`)
  console.log(`   Source   : ${mediaDir}`)
  console.log('')

  const bucketOk = await checkBucketExists()
  if (!bucketOk) {
    console.log('\n⚠️  Pastikan bucket sudah dibuat di MinIO, lalu jalankan script ini kembali.')
    process.exit(1)
  }

  if (!fs.existsSync(mediaDir)) {
    console.error(`❌ Folder tidak ditemukan: ${mediaDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(mediaDir)
  const skipExtensions = ['.pptx', '.docx', '.xlsx'] // Skip non-image files jika perlu

  console.log(`\n📁 Ditemukan ${files.length} file di public/media:\n`)

  let success = 0
  let failed = 0

  for (const file of files) {
    const filePath = path.join(mediaDir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      console.log(`  ⏭️  Skip direktori: ${file}`)
      continue
    }

    const result = await uploadFile(filePath, file)
    if (result) success++
    else failed++
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Berhasil diupload : ${success} file`)
  console.log(`❌ Gagal             : ${failed} file`)
  console.log('='.repeat(50))
  console.log('\n🎉 Selesai! Semua file sekarang tersimpan di MinIO.')
  console.log(`   URL media contoh: ${MINIO_ENDPOINT}/${MINIO_BUCKET}/logo-without-tag.png`)
}

main().catch(console.error)

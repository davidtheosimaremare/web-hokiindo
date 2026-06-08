import { S3Client, PutBucketPolicyCommand } from '@aws-sdk/client-s3';

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'https://assets.hokiindo.co.id'
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'admin'
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'hokiindojaya123@'
const MINIO_BUCKET = process.env.MINIO_BUCKET || 'hokiindo'

const s3 = new S3Client({
  endpoint: MINIO_ENDPOINT,
  credentials: {
    accessKeyId: MINIO_ACCESS_KEY,
    secretAccessKey: MINIO_SECRET_KEY,
  },
  region: 'us-east-1',
  forcePathStyle: true,
})

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${MINIO_BUCKET}/*`
    }
  ]
};

async function run() {
  try {
    await s3.send(new PutBucketPolicyCommand({
      Bucket: MINIO_BUCKET,
      Policy: JSON.stringify(policy)
    }));
    console.log("✅ Bucket policy updated successfully. It is now PUBLIC.");
  } catch(e) {
    console.error("❌ Failed to update bucket policy:", e);
  }
}
run();

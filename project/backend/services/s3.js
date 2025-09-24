const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

async function uploadObject(key, body, contentType='application/octet-stream') {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
}

module.exports = { uploadObject };

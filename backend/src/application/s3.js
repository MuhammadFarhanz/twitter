import { S3Client } from "@aws-sdk/client-s3";

// import { env } from "~/env.mjs";

export const config = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_KEY_SECRET,
  },
  forcePathStyle: true,
  signatureVersion: "v4",
};

export const s3Client = new S3Client({
  ...config,
  endpoint: process.env.S3_CLIENT_ENDPOINT,
});

export const s3Server = new S3Client({
  ...config,
  endpoint: process.env.S3_SERVER_ENDPOINT,
});

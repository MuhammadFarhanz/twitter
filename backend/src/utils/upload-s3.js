import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../application/s3.js";

export const uploadImageToS3 = async (files) => {
  const bucketName = process.env.S3_BUCKET;
  const uploadedUrls = [];

  for (const file of files) {
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    await s3Client.send(new PutObjectCommand(params));

    uploadedUrls.push(
      `${process.env.S3_SERVER_ENDPOINT}/${bucketName}/${params.Key}`
    );
  }

  return uploadedUrls;
};

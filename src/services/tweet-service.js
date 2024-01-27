import { prisma } from "../application/database.js";
import {
  createTweetValidation,
  getTweetValidation,
} from "../validation/tweet-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const data = validate(createTweetValidation, request);

  // Assuming data.images is an array of image URLs
  const imageUrls = data?.images;

  // Filter out undefined values from the array
  const filteredImageUrls = imageUrls?.filter((url) => url !== undefined);

  const image = filteredImageUrls?.map((imageUrl) => ({ url: imageUrl }));

  return await prisma.tweet.create({
    data: {
      content: data.content,
      authorId: data?.authorId,
      images: {
        create: image,
      },
    },
    select: {
      content: true,
      images: true,
      likes: true,
    },
  });
};

const getAll = async () => {
  return await prisma.tweet.findMany({
    take: 10,
    // orderBy: {
    //   _random: "asc",
    // },
    select: {
      id: true,
      content: true,
      createdAt: true,
      images: true,
      likes: {
        select: {
          id: true,
          userId: true,
          user: true,
        },
      },
      comments: true,
      _count: {
        select: { likes: true },
      },
    },
  });
};

const getById = async (id) => {
  id = validate(getTweetValidation, id);

  return await prisma.tweet.findUnique({
    where: {
      id: id,
    },
    select: {
      // id: true,
      content: true,
      images: true,
      likes: true,
    },
  });
};

export default {
  create,
  getAll,
  getById,
};

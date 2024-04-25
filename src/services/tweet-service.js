import { prisma } from "../application/database.js";
import {
  replyIncludeFields,
  tweetIncludeFields,
  userSelectFields,
} from "../utils/common-field.js";
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

  // Create the 'images' array for Prisma
  const images = filteredImageUrls?.map((url) => ({ url }));

  return await prisma.tweet.create({
    data: {
      content: data?.content,
      replyToId: data?.replyToId,
      authorId: data?.authorId,
      images: {
        create: images,
      },
    },
    select: {
      content: true,
      images: true,
      // likes: true,
    },
  });
};

const timeline = async (take, lastCursor) => {
  const results = await prisma.tweet.findMany({
    take: take ? parseInt(take) : 10,
    ...(lastCursor && {
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: parseInt(lastCursor),
      },
    }),
    orderBy: {
      id: "desc",
    },
    where: {
      replyToId: null,
    },
    include: tweetIncludeFields,
  });

  if (results.length == 0) {
    return {
      data: [],
      metaData: {
        lastCursor: null,
        hasNextPage: false,
      },
    };
  }

  const lastPostInResults = results[results.length - 1];
  const newCursor = lastPostInResults.id;

  const nextPage = await prisma.tweet.findMany({
    take: take ? parseInt(take) : 7,
    cursor: {
      id: newCursor,
    },
    orderBy: {
      id: "desc",
    },
    where: {
      replyToId: null,
    },
    include: tweetIncludeFields,
  });

  const data = {
    data: results,
    metaData: {
      lastCursor: newCursor,
      hasNextPage: nextPage.length > 0,
    },
  };

  return data;
};

const getAll = async () => {
  return await prisma.tweet.findMany({
    take: 20,
    where: {
      replyToId: null,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      images: true,
      likedBy: true,
      retweetedBy: {
        select: {
          id: true,
        },
      },
      author: {
        select: {
          username: true,
          name: true,
          id: true,
          bio: true,
          profile_pic: true,
          _count: true,
        },
      },
      _count: true,
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
      id: true,
      content: true,
      createdAt: true,
      images: true,
      replyToId: true,
      retweetedBy: true,
      likedBy: true,
      parent: {
        include: {
          author: {
            select: userSelectFields,
          },
          images: true,
        },
      },
      author: {
        select: userSelectFields,
      },
      replies: {
        include: replyIncludeFields,
      },
      _count: true,
    },
  });
};

export default {
  create,
  getAll,
  getById,
  timeline,
};

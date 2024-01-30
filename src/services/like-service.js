import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import { validate } from "../validation/validation.js";

const likeTweet = async (request) => {
  const data = validate(likeValidation, request);

  console.info(request, "ini req");
  const existingTweet = await prisma.tweet.findUnique({
    where: {
      id: data.tweetId,
    },
  });

  if (!existingTweet) {
    throw new ResponseError(404, "Tweet not found");
  }

  // const existingLike = await prisma.like.findFirst({
  //   where: {
  //     userId: data.userId,
  //     tweetId: data.tweetId,
  //   },
  // });

  // if (existingLike) {
  //   throw new ResponseError(400, "User has already liked the tweet");
  // }

  const liked = await prisma.like.create({
    data: {
      tweet: {
        connect: {
          id: data.tweetId,
        },
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
    select: {
      tweet: true,
    },
  });

  return liked;
};

const unlikeTweet = async (request) => {
  const data = validate(likeValidation, request);

  const existingTweet = await prisma.tweet.findUnique({
    where: {
      id: data.tweetId,
    },
  });

  if (!existingTweet) {
    throw new ResponseError(404, "Tweet not found");
  }

  // Optionally, you may want to check if the user has already liked the tweet
  const existingLike = await prisma.like.findFirst({
    where: {
      userId: data.userId,
      tweetId: data.tweetId,
    },
  });

  if (!existingLike) {
    throw new ResponseError(404, "User has not liked the tweet");
  }

  const unliked = await prisma.like.delete({
    where: {
      id: existingLike.id, // Provide the unique identifier for the like
    },
    select: {
      tweet: true,
    },
  });

  return unliked;
};

export default { likeTweet, unlikeTweet };

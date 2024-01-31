import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const data = validate(likeValidation, request);

  const existingRetweet = await prisma.retweet.findUnique({
    where: {
      tweetId_userId: {
        tweetId: data.tweetId,
        userId: data.userId,
      },
    },
  });

  if (existingRetweet) {
    await prisma.retweet.delete({
      where: {
        id: existingRetweet.id,
      },
    });
  } else {
    await prisma.retweet.create({
      data: {
        userId: data.userId,
        tweetId: data.tweetId,
      },
    });
  }
};

export default { create };

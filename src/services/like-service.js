import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const data = validate(likeValidation, request);

  const existingLike = await prisma.like.findUnique({
    where: {
      tweetId_userId: {
        tweetId: data.tweetId,
        userId: data.userId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: data.userId,
        tweetId: data.tweetId,
      },
    });
  }
};

export default { create };

import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const data = validate(likeValidation, request);
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
    include: {
      likedTweets: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: data.userId,
      tweetId: data.tweetId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    console.log(
      `Tweet with ID ${data.tweetId} unliked by user with ID ${data.userId}`
    );
  } else {
    await prisma.like.create({
      data: {
        userId: data.userId,
        tweetId: data.tweetId,
      },
    });

    console.log(
      `Tweet with ID ${data.tweetId} liked by user with ID ${data.userId}`
    );
  }
};

export default { create };

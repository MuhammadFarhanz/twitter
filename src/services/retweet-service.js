import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const { userId, tweetId } = validate(likeValidation, request);

  console.log(userId, tweetId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      retweets: true, // Include retweets in the user's data
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const existingRetweet = await prisma.retweet.findFirst({
    where: {
      userId: userId,
      tweetId: tweetId,
    },
  });

  if (existingRetweet) {
    await prisma.retweet.delete({
      where: {
        id: existingRetweet.id,
      },
    });
    console.log(` unretweet by user with ID `);
  } else {
    await prisma.retweet.create({
      data: {
        userId: userId,
        tweetId: tweetId,
      },
    });

    console.log(` retweet by user with ID `);
  }
};

export default { create };

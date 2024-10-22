import Joi from "joi";

const likeValidation = Joi.object({
  tweetId: Joi.number(),
  userId: Joi.number(),
});

export { likeValidation };

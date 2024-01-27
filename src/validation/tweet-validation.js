import Joi from "joi";

const createTweetValidation = Joi.object({
  id: Joi.number(),
  content: Joi.string().max(500).required(),
  images: Joi.array(),
  author: Joi.string(),
  authorId: Joi.number().required(),
  hashtags: Joi.array(),
});

const getTweetValidation = Joi.number().integer().required();

export { createTweetValidation, getTweetValidation };

import Joi from "joi";

const createTweetValidation = Joi.object({
  id: Joi.number(),
  content: Joi.string().max(500).allow(""),
  images: Joi.array().items(Joi.string()),
  author: Joi.string(),
  authorId: Joi.number().required(),
  replyToId: Joi.number(),
})
  .custom((value, helpers) => {
    const { content, images } = value;
    if (!content && !images) {
      return helpers.error("any.required");
    }
    return value;
  }, "any.required")
  .messages({
    "any.required": "Either 'content' or 'images' must be provided",
  });

const getTweetValidation = Joi.number().integer().required();

export { createTweetValidation, getTweetValidation };

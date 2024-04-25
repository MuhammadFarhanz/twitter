import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().max(20).optional(),
  bio: Joi.string().max(100).optional(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

const getUserValidation = Joi.alternatives()
  .try(Joi.string().max(20), Joi.number())
  .required();

const updateUserValidation = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().max(20).optional(),
  password: Joi.string().min(5).optional(),
  profile_pic: Joi.string().optional(),
  name: Joi.string().optional(),
});

const followValidationSchema = Joi.object({
  userId: Joi.number().required(),
  userIdToFollow: Joi.number().required(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  followValidationSchema,
};

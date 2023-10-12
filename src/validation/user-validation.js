import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().max(20).optional(),
  bio: Joi.string().max(100).optional(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(20).required(),
  password: Joi.string().min(5).required(),
});

const getUserValidation = Joi.string().max(100).required();

export { registerUserValidation, loginUserValidation, getUserValidation };

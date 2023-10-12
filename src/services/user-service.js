import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(404, "username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return await prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "username or passowrd wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (isPasswordValid) {
    const payload = {
      id: user.id,
      username: user.username,
    };

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret);

    console.info(token);
    return prisma.user.update({
      data: {
        token: token,
      },
      where: {
        username: user.username,
      },
      select: {
        token: true,
      },
    });
  } else {
    throw new ResponseError(401, "password invalid");
  }
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return user;
};

export default {
  register,
  login,
  get,
};

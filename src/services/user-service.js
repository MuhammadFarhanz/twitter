import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
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
      username: true,
      name: true,
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
      username: user.username,
      name: user.name,
    };

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret);

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

const get = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
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

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prisma.user.count({
    where: {
      id: user.id,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(401, "user not found");
  }

  const data = {};

  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      token: null,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};

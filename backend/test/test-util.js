import { prisma } from "../src/application/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const removeTestUser = async () => {
  await prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secret", 10),
      name: "test",
      email: "test@gmail.com",
    },
  });
};

export const createUserAndGenerateTestToken = async () => {
  const user = await prisma.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secret", 10),
      name: "test",
      email: "test@gmail.com",
    },
  });

  const token = jwt.sign(
    {
      username: user.username,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const updatedToken = prisma.user.update({
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

  return updatedToken;
};

export const getTestUser = async () => {
  return prisma.user.findUnique({
    where: {
      username: "test",
    },
  });
};

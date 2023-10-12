import jwt from "jsonwebtoken";
import { prisma } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }

  const token = authorization.split("Bearer ")[1];

  const secret = process.env.JWT_SECRET;

  try {
    const decode = jwt.verify(token, secret);

    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }
};

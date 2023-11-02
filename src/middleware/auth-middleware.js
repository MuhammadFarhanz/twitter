import jwt from "jsonwebtoken";
import { prisma } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({
        errors: "Unauthorized: Missing token",
      });
    }

    const cookieArray = cookies.split(";");

    let token = null;

    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.trim().split("=");

      if (cookieName === "token") {
        token = cookieValue;
        break;
      }
    }

    if (!token) {
      return res.status(401).json({
        errors: "Unauthorized: Invalid token",
      });
    }

    const secret = process.env.JWT_SECRET;

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, secret);

      // Check if the token is in the correct format
      if (!decoded || !decoded.username) {
        throw new Error("Invalid token format");
      }

      // Find the user based on the token
      const user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });

      if (!user) {
        return res.status(401).json({
          errors: "Unauthorized: User not found",
        });
      }

      // Attach the user to the request object
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        errors: "Unauthorized: Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};

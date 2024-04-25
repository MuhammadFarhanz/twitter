import { raw } from "@prisma/client/runtime/library.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { likeValidation } from "../validation/like-validation.js";
import {
  followValidationSchema,
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  replyIncludeFields,
  tweetIncludeFields,
  userSelectFields,
} from "../utils/common-field.js";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: user.username }, { email: user.email }],
    },
  });

  if (existingUser) {
    if (existingUser.username === user.username) {
      throw new ResponseError(400, "Username already exists", "username");
    } else if (existingUser.email === user.email) {
      throw new ResponseError(400, "Email is already registered", "email");
    }
  }

  user.password = await bcrypt.hash(user.password, 10);

  return await prisma.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
};

const login = async (request, res) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "invalid email", "email");
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

    const token = jwt.sign(payload, secret, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      path: "/",
      proxy: true,
      // domain:
      //   process.env.NODE_ENV === "production" ? ".vercel.app" : "localhost",
    });

    const updatedUser = await prisma.user.update({
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

    return updatedUser;
    //return res.status(200).json({ message: "Login successful" });
  } else {
    throw new ResponseError(401, "invalid password", "password");
  }
};

const logout = async (id, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      token: null,
    },
  });

  // res.clearCookie("token", {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "lax",
  //   path: "/",
  // });

  return;

  //return res.status(200).json({ message: "Logged out successfully" });
};

const get = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      profile_pic: true,
      is_verified: true,
      _count: {
        select: {
          followedBy: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return user;
};

const getByUsername = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      password: false,
      token: false,
      id: true,
      username: true,
      name: true,
      bio: true,
      profile_pic: true,
      is_verified: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      followedBy: {
        select: userSelectFields,
      },
      retweets: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tweet: {
            include: {
              ...tweetIncludeFields,
              retweetedBy: true,
            },
          },
        },
      },
      likedTweets: {
        select: {
          tweet: {
            select: tweetIncludeFields,
          },
        },
      },
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: user.id,
      replyToId: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: tweetIncludeFields,
  });

  const replies = await prisma.tweet.findMany({
    where: {
      authorId: user.id,
      replyToId: {
        not: null,
      },
    },
    include: replyIncludeFields,
  });

  // Combine the user data and the tweets data into one object
  const result = {
    ...user,
    tweets: tweets,
    replies: replies,
  };

  // Return the combined data
  return result;
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

  if (user.profile_pic) {
    data.profile_pic = user.profile_pic;
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

const follow = async (request) => {
  const data = validate(followValidationSchema, request);

  const userToFollow = await prisma.user.findUnique({
    where: { id: data.userIdToFollow },
  });

  if (!userToFollow) {
    throw new ResponseError(404, "User to follow not found");
  }
  const existingFollow = await prisma.user.findFirst({
    where: {
      id: data.userId,
      following: {
        some: { id: data.userIdToFollow },
      },
    },
  });

  if (existingFollow) {
    // If already following, unfollow
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        following: {
          disconnect: { id: data.userIdToFollow },
        },
      },
    });
    return { message: "User unfollowed successfully" };
  } else {
    // If not already following, follow
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        following: {
          connect: { id: data.userIdToFollow },
        },
      },
    });
    return { message: "User followed successfully" };
  }
};

const bookmarks = async (request) => {
  const data = validate(likeValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
    select: {
      bookmark: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: data.tweetId,
    },
  });

  if (!tweet) {
    throw new ResponseError(404, "Tweet not found");
  }

  const isBookmarked = user.bookmark.some(
    (bookmark) => bookmark.tweetId === data.tweetId
  );

  if (isBookmarked) {
    await prisma.bookmark.delete({
      where: {
        userId_tweetId: {
          userId: data.userId,
          tweetId: data.tweetId,
        },
      },
    });

    console.log(
      `Tweet with ID ${data.tweetId} unbookmarked by user with ID ${data.userId}`
    );
  } else {
    await prisma.bookmark.create({
      data: {
        userId: data.userId,
        tweetId: data.tweetId,
      },
    });

    console.log(
      `Tweet with ID ${data.tweetId} bookmarked by user with ID ${data.userId}`
    );
  }
};

const getBookmark = async (userId) => {
  userId = validate(getUserValidation, userId);

  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
    select: {
      tweet: {
        include: {
          images: true,
          _count: true,
          likedBy: true,
          repliedBy: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
          bookmarkedBy: true,
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              bio: true,
              profile_pic: true,
              is_verified: true,
              _count: true,
            },
          },
        },
      },
    },
  });

  if (!bookmark) {
    throw new ResponseError(404, "bookmark not found");
  }

  return bookmark;
};

const getFollowSuggestion = async (currentUserId) => {
  const data = await prisma.user.findMany({
    take: 3,
    where: {
      id: {
        not: currentUserId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      profile_pic: true,
      is_verified: true,
      _count: true,
    },
  });

  return data;
};

export default {
  register,
  login,
  get,
  getByUsername,
  update,
  logout,
  follow,
  bookmarks,
  getBookmark,
  getFollowSuggestion,
};

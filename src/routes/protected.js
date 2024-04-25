import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import tweetController from "../controller/tweet-controller.js";
import multer from "multer";
import likeController from "../controller/like-controller.js";
import retweetController from "../controller/retweet-controller.js";
// import replyController from "../controller/reply-controller.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);

userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);
userRouter.post("/api/users/follow/:id", userController.follow);
userRouter.post("/api/users/bookmark", userController.bookmark);
userRouter.get("/api/users/bookmark", userController.getBookmark);
userRouter.get("/api/users/random", userController.getFollowSuggestion);
userRouter.get("/api/users/:username", userController.getByUsername);
//Tweet API
userRouter.post("/api/tweet", tweetController.create);
userRouter.get("/api/tweet", tweetController.getAll);
userRouter.get("/api/tweet/timeline", tweetController.timeline);
userRouter.get("/api/tweet/:id", tweetController.getById);

//Like Tweet API
userRouter.post("/api/tweet/like", likeController.create);

//Retweet API
userRouter.post("/api/tweet/retweet", retweetController.create);

export { userRouter };

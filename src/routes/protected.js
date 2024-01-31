import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import tweetController from "../controller/tweet-controller.js";
import multer from "multer";
import likeController from "../controller/like-controller.js";
import retweetController from "../controller/retweet-controller.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

const upload = multer({ dest: "uploads/" });

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

//Tweet API
userRouter.post("/api/tweet", tweetController.create);
userRouter.get("/api/tweet", tweetController.getAll);
userRouter.get("/api/tweet/:id", tweetController.getById);

//Like Tweet API
userRouter.post("/api/tweet/like", likeController.likeTweet);
userRouter.post("/api/tweet/unlike", likeController.unlikeTweet);

//Retweet API
userRouter.post("/api/tweet/retweet", retweetController.create);

export { userRouter };

import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

publicRouter.get("/test", async (req, res, next) => {
  try {
    const result = "test API at 8000";

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
});

export { publicRouter };

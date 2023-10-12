import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public.js";
import { userRouter } from "../routes/protected.js";

export const app = express();

app.use(express.json());
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

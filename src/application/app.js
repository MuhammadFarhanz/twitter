import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public.js";
import { userRouter } from "../routes/protected.js";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

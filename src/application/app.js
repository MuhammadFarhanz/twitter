import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public.js";
import { userRouter } from "../routes/protected.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

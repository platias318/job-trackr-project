import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import passport from "./config/passport.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow http requests from the frontend URL
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/", routes);

export default app;

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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // true on HTTPS in production
//       httpOnly: true, // prevents client JS from reading cookie
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // necessary for cross-origin cookies
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   }),
// );

app.use(passport.initialize());

app.use("/", routes);

export default app;

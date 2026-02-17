import pgSession from "connect-pg-simple";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import pg from "pg";

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

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // Your Neon connection string
  ssl: { rejectUnauthorized: false }, // Required for Neon/Vercel
});

const PostgresStore = pgSession(session);

app.set("trust proxy", 1);

app.use(
  session({
    store: new PostgresStore({
      pool: pgPool,
      tableName: "session", // Must match the table you created
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true on HTTPS in production
      httpOnly: true, // prevents client JS from reading cookie
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // necessary for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

export default app;

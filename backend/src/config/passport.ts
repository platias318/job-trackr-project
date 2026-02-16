import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { pool } from "../config/db.js";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/secrets`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0].value;
        const name = profile.displayName;

        const existingUser = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [googleId],
        );

        const user = existingUser.rows[0];

        if (!user) {
          const newUser = await pool.query(
            "INSERT INTO users (email, name, google_id) VALUES ($1, $2, $3) RETURNING *",
            [email, name, googleId],
          );

          return cb(null, newUser.rows[0]);
        } else {
          cb(null, existingUser.rows[0]);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [id],
    );

    cb(null, result.rows[0] ?? false);
  } catch (err) {
    cb(err as Error);
  }
});

export default passport;

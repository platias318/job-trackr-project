import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { pool } from "../config/db.js";

/*
  Here we use the passport.js npm package to define the google oauth 2.0 
  in order to sign the user up to the database and retrieve his data
*/
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
          "SELECT * FROM users WHERE google_id = $1 OR email = $2",
          [googleId, email],
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

export default passport;

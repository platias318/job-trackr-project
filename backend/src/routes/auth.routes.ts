import express, { Request, Response } from "express";

import { pool } from "../config/db.js";
import passport from "../config/passport.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { User } from "../types/user.types.js";
import { signToken, verifyToken } from "../utils/jwt.js";

const router = express.Router();

//This is the first endpoint called, this redirects to google authentication page
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

//If authentication is successfull, we go into this endpoint, and in either case we get redirected to a new endpoint(here could be the protected router we want not to be public)
router.get(
  "/google/secrets",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as User;
    const code = signToken(user.id);

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?code=${code}`);
  },
);

router.get("/exchange", async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ error: "No code provided" });
    return;
  }

  try {
    const payload = verifyToken(code);

    const result = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [payload.id],
    );

    if (!result.rows[0]) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Now set the long-lived cookie in a direct API response
    const token = signToken(result.rows[0].id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ ok: true });
  } catch {
    res.status(401).json({ error: "Invalid or expired code" });
  }
});

//When this endpoint gets hit, it checks if we are authenticated with the isAuthenticated func we created above, and then if it is true it returns the user as an object (to the frontend)
router.get("/me", isAuthenticated, (req: Request, res: Response) => {
  const user = req.user as User;

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

//This func logs us out / destroys the cookie session
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
});

export default router;

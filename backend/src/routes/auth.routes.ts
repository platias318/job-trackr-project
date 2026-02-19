import { Request, Response, Router } from "express";

import { pool } from "../config/db.js";
import passport from "../config/passport.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { User } from "../types/user.types.js";
import { signToken, verifyToken } from "../utils/jwt.js";

const router = Router();

// This endpoint redirects to google authentication page, this gets called when sign in button is called
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/secrets",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false, // We don't want session cookies
  }),
  // Successful redirect
  (req: Request, res: Response) => {
    const user = req.user as User;
    const code = signToken(user.id);

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?code=${code}`);
  },
);

// This is used to exchange cookies with frontend in order to keep the user signed in
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

// When this endpoint gets hit, it checks if we are authenticated with the isAuthenticated middleware func
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

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({ message: "Logged out successfully" });
});

export default router;

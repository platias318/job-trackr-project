import express, { Request, Response } from "express";

import passport from "../config/passport.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { User } from "../types/user.types.js";
import { signToken } from "../utils/jwt.js";

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
    const token = signToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`); //the "protected" endpoint
  },
);

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

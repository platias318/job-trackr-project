import express, { NextFunction, Request, Response } from "express";

import passport from "../config/passport.js";
import { User } from "../types/user.types.js";

const router = express.Router();

const getUser = (req: Request): User => {
  return req.user!;
};

const isAuthenticated = (
  //middleware function that checks if the user has been authenticated or not, if he is , go to Next() otherwise throw error
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

//This is the first endpoint called, this redirects to google authentication page
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

//If authentication is successfull, we go into this endpoint, and in either case ewe get redirected to a new endpoint(here could be the protected router we want not to be public)
router.get(
  "/google/secrets",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`); //the "protected" endpoint
  },
);

//When this endpoint gets hit, it checks if we are authenticated with the isAuthenticated func we created above, and then if it is true it returns the user as an object (to the frontend)
router.get("/me", isAuthenticated, (req: Request, res: Response) => {
  const user = getUser(req);

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

//This func logs us out / destorys the cookie session
router.post("/logout", (req: Request, res: Response): void => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        console.error("Session destruction error:", destroyErr);
      }

      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

export default router;

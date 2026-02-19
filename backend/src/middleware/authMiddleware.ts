import { NextFunction, Request, Response } from "express";

import { pool } from "../config/db.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const payload = verifyToken(token);

    const result = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [payload.id],
    );

    if (!result.rows[0]) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = result.rows[0];
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

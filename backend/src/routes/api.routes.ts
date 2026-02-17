import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/data", (req, res) => {
  res.json({
    message: "Here is some sample API data",
    items: ["apple", "banana", "cherry", "orange"],
  });
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;

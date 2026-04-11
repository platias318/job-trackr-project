import { Router } from "express";

import applicationRoutes from "./application.routes.js";
import authRoutes from "./auth.routes.js";
import cvRoutes from "./cv.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);
router.use("/cvs", cvRoutes);

export default router;

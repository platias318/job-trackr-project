import { Router } from "express";
import homeRoutes from "./home.routes.js";
import apiRoutes from "./api.routes.js";

const router = Router();

router.use("/", homeRoutes);

router.use("/api", apiRoutes);

export default router;

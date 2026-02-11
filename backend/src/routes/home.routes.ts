import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcomeeeeeeeee");
});

router.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default router;

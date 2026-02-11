import { Router } from "express";

const router = Router();

router.get("/data", (req, res) => {
  res.json({
    message: "Here is some sample API data",
    items: ["apple", "banana", "cherry", "orange"],
  });
});

export default router;

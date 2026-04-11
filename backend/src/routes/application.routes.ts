import { Request, Response, Router } from "express";

import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createApplication,
  deleteApplication,
  getApplicationCount,
  getApplicationsByUser,
  updateApplication,
} from "../services/application.service.js";
import {
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "../types/application.types.js";
import { User } from "../types/user.types.js";
import { parseId } from "../utils/parseId.js";
import {
  validateCreateApplication,
  validateUpdateApplication,
} from "../utils/validateApplication.js";

const router = Router();

router.use(isAuthenticated); //Need to be authenticated to reach all these endpoints below

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;

  try {
    const applications = await getApplicationsByUser(user.id);
    res.json({ applications });
  } catch {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const data = req.body as CreateApplicationPayload;

  const error = validateCreateApplication(data);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const count = await getApplicationCount(user.id);
  if (count >= 10) {
    res
      .status(400)
      .json({ error: "You have reached the maximum of 10 applications" });
    return;
  }

  try {
    const application = await createApplication(user.id, {
      ...data,
      job_link: data.job_link || null,
      linkedin_link: data.linkedin_link || null,
      notes: data.notes || null,
    });
    res.status(201).json({ application });
  } catch {
    res.status(500).json({ error: "Failed to create application" });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const data = req.body as UpdateApplicationPayload;
  const id = parseId(req.params.id as string);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const error = validateUpdateApplication(data);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  try {
    const application = await updateApplication(id, user.id, data);
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ application });
  } catch {
    res.status(500).json({ error: "Failed to update application" });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const id = parseId(req.params.id as string);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const deleted = await deleteApplication(id, user.id);
    if (!deleted) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ message: "Application deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;

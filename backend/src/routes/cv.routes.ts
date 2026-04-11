import { del, put } from "@vercel/blob";
import { Request, Response, Router } from "express";
import multer from "multer";

import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createCV,
  deleteCV,
  getCVsByUser,
  updateCV,
} from "../services/cv.service.js";
import { CreateCVPayload, UpdateCVPayload } from "../types/cv.types.js";
import { User } from "../types/user.types.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(), // keep file in memory as a Buffer
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
  fileFilter: (_, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.use(isAuthenticated);

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  try {
    const cvs = await getCVsByUser(user.id);
    res.json({ cvs });
  } catch {
    res.status(500).json({ error: "Failed to fetch CVs" });
  }
});

router.post(
  "/",
  upload.single("file"), // "file" matches the FormData field name on the frontend
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User;
    const { name, version_label, notes, is_default } =
      req.body as CreateCVPayload;

    if (!name?.trim()) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "A PDF file is required" });
      return;
    }

    try {
      const blob = await put(
        `cvs/${user.id}/${Date.now()}-${req.file.originalname}`,
        req.file.buffer,
        {
          access: "public", // must match your Vercel Blob store access setting
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: "application/pdf",
        },
      );

      const cv = await createCV(user.id, {
        name: name.trim(),
        version_label: version_label?.trim() || null,
        notes: notes?.trim() || null,
        is_default: is_default === true,
        file_url: blob.url,
      });

      res.status(201).json({ cv });
    } catch (err) {
      if (err instanceof Error && err.message === "CV_LIMIT_REACHED") {
        res
          .status(400)
          .json({ error: "You have reached the maximum of 2 CVs" });
        return;
      }
      res.status(500).json({ error: "Failed to upload CV" });
    }
  },
);

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { name, version_label, notes, is_default } =
    req.body as UpdateCVPayload;

  try {
    const cv = await updateCV(id, user.id, {
      name,
      version_label,
      notes,
      is_default,
    });
    if (!cv) {
      res.status(404).json({ error: "CV not found" });
      return;
    }
    res.json({ cv });
  } catch {
    res.status(500).json({ error: "Failed to update CV" });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const { deleted, fileUrl } = await deleteCV(id, user.id);
    if (!deleted) {
      res.status(404).json({ error: "CV not found" });
      return;
    }
    if (fileUrl) {
      await del(fileUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }
    res.json({ message: "CV deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete CV" });
  }
});

export default router;

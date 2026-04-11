import { pool } from "../config/db.js";
import { CreateCVPayload, CV, UpdateCVPayload } from "../types/cv.types.js";

const CV_LIMIT = 2;

export const getCVsByUser = async (userId: number): Promise<CV[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM cvs WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC",
    [userId],
  );
  return rows;
};

export const getCVCount = async (userId: number): Promise<number> => {
  const { rows } = await pool.query(
    "SELECT COUNT(*) FROM cvs WHERE user_id = $1",
    [userId],
  );
  return parseInt(rows[0].count);
};

export const createCV = async (
  userId: number,
  data: CreateCVPayload,
): Promise<CV> => {
  const count = await getCVCount(userId);
  if (count >= CV_LIMIT) {
    throw new Error("CV_LIMIT_REACHED");
  }

  if (data.is_default) {
    await pool.query("UPDATE cvs SET is_default = FALSE WHERE user_id = $1", [
      userId,
    ]);
  }

  const { rows } = await pool.query(
    `INSERT INTO cvs (user_id, name, version_label, notes, is_default, file_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      data.name,
      data.version_label,
      data.notes,
      data.is_default,
      data.file_url,
    ],
  );
  return rows[0];
};

export const updateCV = async (
  id: number,
  userId: number,
  data: UpdateCVPayload,
): Promise<CV | null> => {
  if (data.is_default) {
    await pool.query("UPDATE cvs SET is_default = FALSE WHERE user_id = $1", [
      userId,
    ]);
  }

  const { rows } = await pool.query(
    `UPDATE cvs
     SET name          = COALESCE($1, name),
         version_label = COALESCE($2, version_label),
         notes         = COALESCE($3, notes),
         is_default    = COALESCE($4, is_default),
         updated_at    = NOW()
     WHERE id = $5 AND user_id = $6
     RETURNING *`,
    [data.name, data.version_label, data.notes, data.is_default, id, userId],
  );
  return rows[0] ?? null;
};

export const deleteCV = async (
  id: number,
  userId: number,
): Promise<{ deleted: boolean; fileUrl: string | null }> => {
  const { rows } = await pool.query(
    "DELETE FROM cvs WHERE id = $1 AND user_id = $2 RETURNING file_url",
    [id, userId],
  );
  if (!rows[0]) return { deleted: false, fileUrl: null };
  return { deleted: true, fileUrl: rows[0].file_url };
};

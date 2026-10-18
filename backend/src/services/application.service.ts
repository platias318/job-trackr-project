import { pool } from "../config/db.js";
import {
  Application,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "../types/application.types.js";

export const getApplicationsByUser = async (
  userId: number,
): Promise<Application[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM applications WHERE user_id = $1 ORDER BY date_applied DESC, created_at DESC",
    [userId],
  );
  return rows;
};

export const createApplication = async (
  userId: number,
  data: CreateApplicationPayload,
): Promise<Application> => {
  const { rows } = await pool.query(
    `INSERT INTO applications (user_id, company_name, job_title, status, date_applied, job_link, linkedin_link, notes, follow_up_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      userId,
      data.company_name,
      data.job_title,
      data.status,
      data.date_applied,
      data.job_link ?? null,
      data.linkedin_link ?? null,
      data.notes ?? null,
      data.follow_up_date ?? null,
    ],
  );
  return rows[0];
};

export const updateApplication = async (
  id: number,
  userId: number,
  data: UpdateApplicationPayload,
): Promise<Application | null> => {
  const { rows } = await pool.query(
    `UPDATE applications
     SET company_name   = COALESCE($1, company_name),
         job_title      = COALESCE($2, job_title),
         status         = COALESCE($3, status),
         date_applied   = COALESCE($4, date_applied),
         job_link       = CASE WHEN $5::boolean  THEN $6::text  ELSE job_link END,
         linkedin_link  = CASE WHEN $7::boolean  THEN $8::text  ELSE linkedin_link END,
         notes          = CASE WHEN $9::boolean  THEN $10::text ELSE notes END,
         follow_up_date = CASE WHEN $11::boolean THEN $12::date ELSE follow_up_date END,
         updated_at     = NOW()
     WHERE id = $13 AND user_id = $14
     RETURNING *`,
    [
      data.company_name,
      data.job_title,
      data.status,
      data.date_applied,
      data.job_link !== undefined,
      data.job_link ?? null,
      data.linkedin_link !== undefined,
      data.linkedin_link ?? null,
      data.notes !== undefined,
      data.notes ?? null,
      data.follow_up_date !== undefined,
      data.follow_up_date ?? null,
      id,
      userId,
    ],
  );
  return rows[0] ?? null;
};

export const deleteApplication = async (
  id: number,
  userId: number,
): Promise<boolean> => {
  const { rowCount } = await pool.query(
    "DELETE FROM applications WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  return (rowCount ?? 0) > 0;
};

export const getApplicationCount = async (userId: number): Promise<number> => {
  const { rows } = await pool.query(
    "SELECT COUNT(*) FROM applications WHERE user_id = $1",
    [userId],
  );
  return parseInt(rows[0].count);
};

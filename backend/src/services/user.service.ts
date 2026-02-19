import { pool } from "../config/db.js";
import { User } from "../types/user.types.js";

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>(
    "SELECT id, name FROM users ORDER BY id ASC",
  );
  return result.rows;
};

export const createUser = async (name: string): Promise<User> => {
  if (!name) {
    throw new Error("Name is required");
  }

  const result = await pool.query<User>(
    "INSERT INTO users (name) VALUES ($1) RETURNING id, name",
    [name],
  );
  return result.rows[0];
};

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
const EXPIRY = "24h";

export const signToken = (userId: number): string => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: EXPIRY });
};

export const verifyToken = (token: string): { id: number } => {
  return jwt.verify(token, SECRET) as { id: number };
};

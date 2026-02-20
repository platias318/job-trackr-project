import crypto from "crypto";

export const generateCode = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

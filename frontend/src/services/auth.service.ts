import type { User } from "@/types/user.types";

import api from "./api";
export const authService = {
  exchange: async (code: string): Promise<void> => {
    await api.get(`/api/auth/exchange?code=${code}`);
  },
  getCurrentUser: async (): Promise<User> => {
    const res = await api.get("/api/auth/me");
    return res.data.user;
  },
  sendCode: async (email: string): Promise<void> => {
    await api.post("/api/auth/email/send-code", { email });
  },
  verifyCode: async (email: string, code: string): Promise<void> => {
    await api.post("/api/auth/email/verify-code", { email, code });
  },
  logout: async (): Promise<void> => {
    await api.post("/api/auth/logout");
  },
};

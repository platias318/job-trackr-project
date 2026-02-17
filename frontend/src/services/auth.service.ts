import type { User } from "@/types/user.types";

import api from "./api";
export const authService = {
  getCurrentUser: async (): Promise<User> => {
    const res = await api.get("/api/auth/me", { withCredentials: true });
    return res.data.user;
  },
  logout: async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
  },
};

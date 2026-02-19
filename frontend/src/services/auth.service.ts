import type { User } from "@/types/user.types";

import api from "./api";
export const authService = {
  getCurrentUser: async (): Promise<User> => {
    const res = await api.get("/api/auth/me");
    console.log("auth.service.ts res.data.user is " + res.data.user);
    return res.data.user;
  },
  logout: async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
  },
};

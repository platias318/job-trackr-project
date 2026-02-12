import api from "./api";

export const userService = {
  getUsers: async () => {
    const res = await api.get("/api/users");
    return res.data;
  },

  createUser: async (data: { name: string }) => {
    const res = await api.post("/api/users", data);
    return res.data;
  },
};

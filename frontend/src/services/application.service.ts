import axios from "axios";

import type {
  Application,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "@/types/application.types";

import api from "./api";

export const applicationService = {
  getAll: async (): Promise<Application[]> => {
    const res = await api.get<{ applications: Application[] }>(
      "/api/applications",
    );
    return res.data.applications;
  },
  create: async (payload: CreateApplicationPayload): Promise<Application> => {
    try {
      const res = await api.post<{ application: Application }>(
        "/api/applications",
        payload,
      );
      return res.data.application;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.error ?? "Failed to create application",
        );
      }
      throw new Error("Failed to create application");
    }
  },
  update: async (
    id: number,
    payload: UpdateApplicationPayload,
  ): Promise<Application> => {
    try {
      const res = await api.put<{ application: Application }>(
        `/api/applications/${id}`,
        payload,
      );
      return res.data.application;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.error ?? "Failed to update application",
        );
      }
      throw new Error("Failed to update application");
    }
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/applications/${id}`);
  },
};

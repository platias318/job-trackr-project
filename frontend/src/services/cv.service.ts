import type { CreateCVPayload, CV, UpdateCVPayload } from "@/types/cv.types";

import api from "./api";

const extractError = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message;
  return fallback;
};

export const cvService = {
  getAll: async (): Promise<CV[]> => {
    const { data } = await api.get<{ cvs: CV[] }>("/api/cvs");
    return data.cvs;
  },
  create: async (payload: CreateCVPayload): Promise<CV> => {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("name", payload.name);
    if (payload.version_label)
      formData.append("version_label", payload.version_label);
    if (payload.notes) formData.append("notes", payload.notes);
    formData.append("is_default", String(payload.is_default ?? false));

    try {
      const { data } = await api.post<{ cv: CV }>("/api/cvs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.cv;
    } catch (err: unknown) {
      throw new Error(extractError(err, "Failed to upload CV"));
    }
  },
  update: async (id: number, payload: UpdateCVPayload): Promise<CV> => {
    try {
      const { data } = await api.put<{ cv: CV }>(`/api/cvs/${id}`, payload);
      return data.cv;
    } catch (err: unknown) {
      throw new Error(extractError(err, "Failed to update CV"));
    }
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/cvs/${id}`);
  },
};

import { useCallback, useEffect, useState } from "react";

import { cvService } from "@/services/cv.service";
import type { CreateCVPayload, CV, UpdateCVPayload } from "@/types/cv.types";

const CV_LIMIT = 2;

export const useCVs = () => {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cvService.getAll();
      setCVs(data);
    } catch {
      setError("Failed to load CVs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const create = async (payload: CreateCVPayload) => {
    const newCV = await cvService.create(payload);
    setCVs((prev) => [newCV, ...prev]);
  };

  const update = async (id: number, payload: UpdateCVPayload) => {
    const updated = await cvService.update(id, payload);
    setCVs((prev) => prev.map((cv) => (cv.id === id ? updated : cv)));
  };

  const remove = async (id: number) => {
    await cvService.delete(id);
    setCVs((prev) => prev.filter((cv) => cv.id !== id));
  };

  return {
    cvs,
    loading,
    error,
    refetch: fetch,
    create,
    update,
    remove,
    atLimit: cvs.length >= CV_LIMIT,
    count: cvs.length,
    limit: CV_LIMIT,
  };
};

import { useCallback, useEffect, useState } from "react";

import { applicationService } from "@/services/application.service";
import type {
  Application,
  ApplicationStatus,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "@/types/application.types";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch {
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const create = async (payload: CreateApplicationPayload) => {
    const newApp = await applicationService.create(payload);
    setApplications((prev) => [newApp, ...prev]);
  };

  const update = async (id: number, payload: UpdateApplicationPayload) => {
    const updated = await applicationService.update(id, payload);
    setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  const remove = async (id: number) => {
    await applicationService.delete(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const filterByStatus = (status: ApplicationStatus | "All") =>
    status === "All"
      ? applications
      : applications.filter((a) => a.status === status);

  return {
    applications,
    loading,
    error,
    refetch: fetch,
    create,
    update,
    remove,
    filterByStatus,
  };
};

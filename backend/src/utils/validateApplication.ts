import {
  APPLICATION_STATUSES,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "../types/application.types.js";

export const validateCreateApplication = (
  data: CreateApplicationPayload,
): string | null => {
  if (
    !data.company_name ||
    !data.job_title ||
    !data.status ||
    !data.date_applied
  ) {
    return "Missing required fields";
  }

  if (!APPLICATION_STATUSES.includes(data.status)) {
    return "Invalid status";
  }

  if (data.notes && data.notes.length > 500) {
    return "Notes too long";
  }

  return null;
};

export const validateUpdateApplication = (
  data: UpdateApplicationPayload,
): string | null => {
  if (data.status && !APPLICATION_STATUSES.includes(data.status)) {
    return "Invalid status";
  }

  if (data.notes && data.notes.length > 500) {
    return "Notes too long";
  }

  return null;
};

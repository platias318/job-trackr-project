import {
  APPLICATION_STATUSES,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "../types/application.types.js";

const isValidDateOnly = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const hasInvalidFollowUp = (value: string | null | undefined): boolean =>
  !!value && !isValidDateOnly(value);

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

  if (hasInvalidFollowUp(data.follow_up_date)) {
    return "Invalid follow-up date";
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

  if (hasInvalidFollowUp(data.follow_up_date)) {
    return "Invalid follow-up date";
  }

  return null;
};

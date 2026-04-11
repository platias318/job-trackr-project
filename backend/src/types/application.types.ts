export const APPLICATION_STATUSES = [
  "Applied",
  "Interview",
  "Technical Test",
  "Offer",
  "Accepted",
  "Rejected",
  "Ghosted",
  "Withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface Application {
  id: number;
  user_id: number;
  company_name: string;
  job_title: string;
  status: ApplicationStatus;
  date_applied: string;
  job_link: string | null;
  linkedin_link: string | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export type CreateApplicationPayload = {
  company_name: string;
  job_title: string;
  status: ApplicationStatus;
  date_applied: string;
  job_link?: string | null;
  linkedin_link?: string | null;
  notes?: string | null;
};

export interface UpdateApplicationPayload {
  company_name?: string;
  job_title?: string;
  status?: ApplicationStatus;
  date_applied?: string;
  job_link?: string | null;
  linkedin_link?: string | null;
  notes?: string | null;
}

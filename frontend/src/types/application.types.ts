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

export const STATUS_TRANSLATION_KEYS: Record<
  //Need this for the i18n translation
  ApplicationStatus | "All",
  string
> = {
  All: "all",
  Applied: "applied",
  Interview: "interview",
  "Technical Test": "technicalTest",
  Offer: "offer",
  Accepted: "accepted",
  Rejected: "rejected",
  Ghosted: "ghosted",
  Withdrawn: "withdrawn",
};

export const STATUS_META: Record<
  ApplicationStatus,
  { color: string; emoji: string }
> = {
  Applied: { color: "#2196f3", emoji: "📤" },
  Interview: { color: "#9c27b0", emoji: "🗓️" },
  "Technical Test": { color: "#ff9800", emoji: "💻" },
  Offer: { color: "#4caf50", emoji: "🎉" },
  Accepted: { color: "#1b5e20", emoji: "✅" },
  Rejected: { color: "#f44336", emoji: "❌" },
  Ghosted: { color: "#9e9e9e", emoji: "👻" },
  Withdrawn: { color: "#795548", emoji: "🚪" },
};

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
  created_at: string;
  updated_at: string;
}

export interface CreateApplicationPayload {
  company_name: string;
  job_title: string;
  status: ApplicationStatus;
  date_applied: string;
  job_link?: string;
  linkedin_link?: string;
  notes?: string;
}

export interface UpdateApplicationPayload {
  company_name?: string;
  job_title?: string;
  status?: ApplicationStatus;
  date_applied?: string;
  job_link?: string;
  linkedin_link?: string;
  notes?: string;
}

import type { Application, ApplicationStatus } from "@/types/application.types";

import { dateOnly } from "./followUp";

export type SortOption =
  | "newest"
  | "oldest"
  | "stageFar"
  | "stageEarly"
  | "followUp";

export const SORT_OPTIONS: SortOption[] = [
  "newest",
  "oldest",
  "stageFar",
  "stageEarly",
  "followUp",
];

export const STAGE_RANK: Record<ApplicationStatus, number> = {
  Accepted: 8,
  Offer: 7,
  "Technical Test": 6,
  Interview: 5,
  Applied: 4,
  Rejected: 3,
  Ghosted: 2,
  Withdrawn: 1,
};

// lower-case + strip accents
const fold = (value: string): string =>
  value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase();

const byNewest = (a: Application, b: Application) =>
  dateOnly(b.date_applied).localeCompare(dateOnly(a.date_applied)) ||
  b.created_at.localeCompare(a.created_at);

const COMPARATORS: Record<
  SortOption,
  (a: Application, b: Application) => number
> = {
  newest: byNewest,
  oldest: (a, b) => -byNewest(a, b),
  stageFar: (a, b) =>
    STAGE_RANK[b.status] - STAGE_RANK[a.status] || byNewest(a, b),
  stageEarly: (a, b) =>
    STAGE_RANK[a.status] - STAGE_RANK[b.status] || byNewest(a, b),
  // soonest follow-up first; applications without one go last
  followUp: (a, b) => {
    const fa = dateOnly(a.follow_up_date);
    const fb = dateOnly(b.follow_up_date);
    if (fa && fb) return fa.localeCompare(fb) || byNewest(a, b);
    if (fa) return -1;
    if (fb) return 1;
    return byNewest(a, b);
  },
};

interface IListOptions {
  status: ApplicationStatus | "All";
  query: string;
  sort: SortOption;
}

export const filterAndSortApplications = (
  applications: Application[],
  { status, query, sort }: IListOptions,
): Application[] => {
  const needle = fold(query.trim());

  return applications
    .filter((app) => status === "All" || app.status === status)
    .filter(
      (app) =>
        !needle ||
        fold(
          `${app.company_name} ${app.job_title} ${app.notes ?? ""}`,
        ).includes(needle),
    )
    .sort(COMPARATORS[sort]);
};

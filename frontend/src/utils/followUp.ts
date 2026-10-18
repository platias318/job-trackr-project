import type { Application, ApplicationStatus } from "@/types/application.types";

export const OPEN_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Technical Test",
  "Offer",
];

// Moving an application into one of these statessuggests picking a follow-up date.
export const FOLLOW_UP_STATUSES: ApplicationStatus[] = [
  "Interview",
  "Technical Test",
];

export const DEFAULT_FOLLOW_UP_DAYS = 7;

const pad = (n: number) => String(n).padStart(2, "0");

const toDateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayString = (): string => toDateString(new Date());

export const addDaysString = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toDateString(d);
};

// The API returns DATE columns as ISO strings ("2026-10-24T00:00:00.000Z")
export const dateOnly = (value: string | null | undefined): string =>
  value ? value.split("T")[0] : "";

const dayNumber = (dateString: string): number => {
  const [y, m, d] = dateString.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
};

export const daysBetween = (from: string, to: string): number =>
  dayNumber(to) - dayNumber(from);

export type FollowUpState = "overdue" | "today" | "soon" | "upcoming";

export interface IFollowUpInfo {
  state: FollowUpState;
  date: string;
  daysLate: number;
  daysLeft: number;
}

export const getFollowUpInfo = (
  app: Pick<Application, "status" | "follow_up_date">,
  today: string = todayString(),
): IFollowUpInfo | null => {
  const date = dateOnly(app.follow_up_date);
  if (!date || !OPEN_STATUSES.includes(app.status)) return null;

  const diff = daysBetween(today, date);
  if (diff < 0) return { state: "overdue", date, daysLate: -diff, daysLeft: 0 };
  if (diff === 0) return { state: "today", date, daysLate: 0, daysLeft: 0 };
  return {
    state: diff <= 2 ? "soon" : "upcoming",
    date,
    daysLate: 0,
    daysLeft: diff,
  };
};

// Applications whose follow-up is due today or already late, most late first
export const getDueFollowUps = (applications: Application[]) =>
  applications
    .map((app) => ({ app, info: getFollowUpInfo(app) }))
    .filter(
      (x): x is { app: Application; info: IFollowUpInfo } =>
        x.info !== null &&
        (x.info.state === "overdue" || x.info.state === "today"),
    )
    .sort((a, b) => a.info.date.localeCompare(b.info.date));

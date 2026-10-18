import type { Application, ApplicationStatus } from "@/types/application.types";

import {
  dateOnly,
  getDueFollowUps,
  OPEN_STATUSES,
  todayString,
} from "./followUp";

// We only know each application's CURRENT status (no history is stored), so
// "responded" and "reached interview" are based on where it stands today.
// An application rejected after an interview therefore counts as "responded"
// but not as "reached interview".
const RESPONDED: ApplicationStatus[] = [
  "Interview",
  "Technical Test",
  "Offer",
  "Accepted",
  "Rejected",
];
const REACHED_INTERVIEW: ApplicationStatus[] = [
  "Interview",
  "Technical Test",
  "Offer",
  "Accepted",
];

export interface IWeekBucket {
  weekStart: string; // YYYY-MM-DD (Monday)
  count: number;
}

export interface IStats {
  total: number;
  active: number;
  responded: number;
  reachedInterview: number;
  offers: number; // Offer + Accepted
  responseRate: number; // 0-100
  interviewRate: number; // 0-100
  followUpsDue: number;
  byStatus: Record<ApplicationStatus, number>;
  weekly: IWeekBucket[];
}

const DAY_MS = 86_400_000;

const toDayNumber = (dateString: string): number => {
  const [y, m, d] = dateString.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
};

const fromDayNumber = (day: number): string =>
  new Date(day * DAY_MS).toISOString().split("T")[0];

// Monday of the week containing the given date
const weekStartDay = (dateString: string): number => {
  const day = toDayNumber(dateString);
  const weekday = (new Date(day * DAY_MS).getUTCDay() + 6) % 7; // Mon=0
  return day - weekday;
};

const pct = (part: number, total: number) =>
  total === 0 ? 0 : Math.round((part / total) * 100);

export const WEEKS_SHOWN = 8;

export const computeStats = (
  applications: Application[],
  today: string = todayString(),
): IStats => {
  const total = applications.length;

  const byStatus = {
    Applied: 0,
    Interview: 0,
    "Technical Test": 0,
    Offer: 0,
    Accepted: 0,
    Rejected: 0,
    Ghosted: 0,
    Withdrawn: 0,
  } as Record<ApplicationStatus, number>;
  applications.forEach((a) => {
    byStatus[a.status] += 1;
  });

  const responded = applications.filter((a) =>
    RESPONDED.includes(a.status),
  ).length;
  const reachedInterview = applications.filter((a) =>
    REACHED_INTERVIEW.includes(a.status),
  ).length;

  const currentWeek = weekStartDay(today);
  const weekly: IWeekBucket[] = Array.from({ length: WEEKS_SHOWN }, (_, i) => ({
    weekStart: fromDayNumber(currentWeek - (WEEKS_SHOWN - 1 - i) * 7),
    count: 0,
  }));
  const firstWeek = currentWeek - (WEEKS_SHOWN - 1) * 7;
  applications.forEach((a) => {
    const date = dateOnly(a.date_applied);
    if (!date) return;
    const index = Math.floor((weekStartDay(date) - firstWeek) / 7);
    if (index >= 0 && index < WEEKS_SHOWN) weekly[index].count += 1;
  });

  return {
    total,
    active: applications.filter((a) => OPEN_STATUSES.includes(a.status)).length,
    responded,
    reachedInterview,
    offers: byStatus.Offer + byStatus.Accepted,
    responseRate: pct(responded, total),
    interviewRate: pct(reachedInterview, total),
    followUpsDue: getDueFollowUps(applications).length,
    byStatus,
    weekly,
  };
};

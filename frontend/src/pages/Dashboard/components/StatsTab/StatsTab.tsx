import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useApplications } from "@/hooks/useApplications";
import {
  APPLICATION_STATUSES,
  STATUS_META,
  STATUS_TRANSLATION_KEYS,
} from "@/types/application.types";
import { computeStats } from "@/utils/stats";

import { statsTabStyles } from "./StatsTab.styles";

interface IKpiProps {
  label: string;
  value: string | number;
  hint?: string;
}

const Kpi = ({ label, value, hint }: IKpiProps) => (
  <Box sx={statsTabStyles.kpiCard}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography sx={statsTabStyles.kpiValue}>{value}</Typography>
    {hint && (
      <Typography variant="caption" color="text.disabled">
        {hint}
      </Typography>
    )}
  </Box>
);

export const StatsTab = () => {
  const { t, i18n } = useTranslation();

  const { applications, loading, error } = useApplications();

  if (loading) {
    return <Skeleton variant="rounded" height={320} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (applications.length === 0) {
    return (
      <Box sx={statsTabStyles.emptyBox}>
        <InsightsOutlinedIcon
          sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
        />
        <Typography color="text.secondary">
          {t("Dashboard.stats.noData")}
        </Typography>
      </Box>
    );
  }

  const stats = computeStats(applications);
  const maxStatus = Math.max(...Object.values(stats.byStatus), 1);
  const maxWeek = Math.max(...stats.weekly.map((w) => w.count), 1);

  return (
    <Box>
      <Box sx={statsTabStyles.kpiGrid}>
        <Kpi label={t("Dashboard.stats.total")} value={stats.total} />
        <Kpi
          label={t("Dashboard.stats.active")}
          value={stats.active}
          hint={t("Dashboard.stats.activeHint")}
        />
        <Kpi
          label={t("Dashboard.stats.responseRate")}
          value={`${stats.responseRate}%`}
          hint={t("Dashboard.stats.responseRateHint")}
        />
        <Kpi
          label={t("Dashboard.stats.interviewRate")}
          value={`${stats.interviewRate}%`}
          hint={t("Dashboard.stats.interviewRateHint")}
        />
      </Box>

      <Box sx={statsTabStyles.panelGrid}>
        <Box sx={statsTabStyles.panel}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>
            {t("Dashboard.stats.byStatus")}
          </Typography>
          {APPLICATION_STATUSES.map((status) => {
            const count = stats.byStatus[status];
            const label = t(
              `Dashboard.ApplicationsTab.${STATUS_TRANSLATION_KEYS[status]}`,
            );
            return (
              <Box key={status} sx={statsTabStyles.barRow}>
                <Typography sx={statsTabStyles.barLabel}>
                  {STATUS_META[status].emoji} {label}
                </Typography>
                <Box
                  sx={statsTabStyles.barTrack}
                  role="img"
                  aria-label={`${label}: ${count}`}
                >
                  <Box
                    sx={{
                      ...statsTabStyles.barFill,
                      width: `${(count / maxStatus) * 100}%`,
                      backgroundColor: STATUS_META[status].color,
                    }}
                  />
                </Box>
                <Typography sx={statsTabStyles.barCount}>{count}</Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={statsTabStyles.panel}>
          <Typography variant="subtitle1" fontWeight={700}>
            {t("Dashboard.stats.perWeek")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t("Dashboard.stats.lastWeeks", { count: stats.weekly.length })}
          </Typography>
          <Box sx={statsTabStyles.weekChart}>
            {stats.weekly.map((week) => (
              <Box key={week.weekStart} sx={statsTabStyles.weekColumn}>
                <Typography variant="caption" fontWeight={700}>
                  {week.count > 0 ? week.count : ""}
                </Typography>
                <Box
                  sx={{
                    ...statsTabStyles.weekBar,
                    height: `${week.count === 0 ? 3 : (week.count / maxWeek) * 100}%`,
                    opacity: week.count === 0 ? 0.25 : 1,
                  }}
                  role="img"
                  aria-label={`${week.weekStart}: ${week.count}`}
                />
                <Typography variant="caption" color="text.secondary" noWrap>
                  {new Date(`${week.weekStart}T00:00:00`).toLocaleDateString(
                    i18n.resolvedLanguage,
                    { day: "numeric", month: "short" },
                  )}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Typography
        variant="caption"
        color="text.disabled"
        display="block"
        mt={2}
      >
        {t("Dashboard.stats.note")}
      </Typography>
    </Box>
  );
};

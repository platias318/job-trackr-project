import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Application } from "@/types/application.types";
import { getDueFollowUps } from "@/utils/followUp";

interface IProps {
  applications: Application[];
  onSelect: (app: Application) => void;
}

// Reminder: lists applications whose follow-up is due today or late.
export const FollowUpAlert = ({ applications, onSelect }: IProps) => {
  const { t } = useTranslation();

  const due = getDueFollowUps(applications);

  if (due.length === 0) return null;

  return (
    <Alert severity="warning" sx={{ mb: 2 }}>
      <AlertTitle>{t("Dashboard.ApplicationsTab.followUpsDue")}</AlertTitle>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {due.map(({ app, info }) => (
          <Button
            key={app.id}
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => onSelect(app)}
          >
            {app.company_name} ·{" "}
            {info.state === "today"
              ? t("Dashboard.ApplicationsTab.followUpToday")
              : t("Dashboard.ApplicationsTab.followUpOverdue", {
                  days: info.daysLate,
                })}
          </Button>
        ))}
      </Box>
    </Alert>
  );
};

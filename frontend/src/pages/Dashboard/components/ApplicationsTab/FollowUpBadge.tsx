import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Application } from "@/types/application.types";
import { type FollowUpState, getFollowUpInfo } from "@/utils/followUp";

import { followUpBadgeStyles } from "./FollowUpBadge.styles";

const COLOR: Record<FollowUpState, "error" | "warning" | "info" | "default"> = {
  overdue: "error",
  today: "warning",
  soon: "info",
  upcoming: "default",
};

interface IProps {
  app: Application;
}

// Shows the follow-up date, coloured by urgency
export const FollowUpBadge = ({ app }: IProps) => {
  const { t } = useTranslation();

  const info = getFollowUpInfo(app);

  if (!info) {
    return (
      <Typography variant="caption" color="text.disabled">
        —
      </Typography>
    );
  }

  const date = new Date(`${info.date}T00:00:00`).toLocaleDateString();
  const suffix =
    info.state === "overdue"
      ? ` · ${t("Dashboard.ApplicationsTab.followUpOverdue", { days: info.daysLate })}`
      : info.state === "today"
        ? ` · ${t("Dashboard.ApplicationsTab.followUpToday")}`
        : "";

  return (
    <Chip
      size="small"
      variant={info.state === "upcoming" ? "outlined" : "filled"}
      color={COLOR[info.state]}
      icon={<EventOutlinedIcon />}
      label={`${date}${suffix}`}
      sx={followUpBadgeStyles.chip}
    />
  );
};

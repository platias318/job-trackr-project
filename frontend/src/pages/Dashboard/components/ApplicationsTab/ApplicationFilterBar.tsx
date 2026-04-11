import { Box, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  type Application,
  type ApplicationStatus,
  STATUS_META,
  STATUS_TRANSLATION_KEYS,
} from "@/types/application.types";

import { applicationFilterBarStyles } from "./ApplicationFilterBar.styles";

const ALL_FILTERS: (ApplicationStatus | "All")[] = [
  "All",
  "Applied",
  "Interview",
  "Technical Test",
  "Offer",
  "Accepted",
  "Rejected",
  "Ghosted",
  "Withdrawn",
];

interface IProps {
  activeFilter: ApplicationStatus | "All";
  applications: Application[];
  onChange: (filter: ApplicationStatus | "All") => void;
}

export const ApplicationFilterBar = ({
  activeFilter,
  applications,
  onChange,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={applicationFilterBarStyles.container}>
      {ALL_FILTERS.map((f) => {
        const count =
          f === "All"
            ? applications.length
            : applications.filter((a) => a.status === f).length;
        const meta = f !== "All" ? STATUS_META[f] : null;
        const isActive = activeFilter === f;
        const label =
          f === "All"
            ? t("Dashboard.ApplicationsTab.all")
            : `${meta?.emoji} ${t(`Dashboard.ApplicationsTab.${STATUS_TRANSLATION_KEYS[f]}`)}`;

        return (
          <Chip
            key={f}
            label={`${label} (${count})`}
            onClick={() => onChange(f)}
            variant={isActive ? "filled" : "outlined"}
            sx={{
              ...(isActive
                ? applicationFilterBarStyles.activeChip
                : applicationFilterBarStyles.chip),
              borderColor: meta?.color ?? "divider",
              ...(isActive && {
                backgroundColor: meta?.color ?? "primary.main",
              }),
            }}
          />
        );
      })}
    </Box>
  );
};

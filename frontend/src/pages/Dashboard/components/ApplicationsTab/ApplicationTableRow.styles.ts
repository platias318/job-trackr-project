import type { SxProps, Theme } from "@mui/material";

interface IApplicationTableRowStyles {
  companyName: SxProps<Theme>;
  statusChip: SxProps<Theme>;
  linkIcon: SxProps<Theme>;
  linkedInIcon: SxProps<Theme>;
}
export const applicationTableRowStyles: IApplicationTableRowStyles = {
  companyName: {
    fontWeight: 600,
  },
  statusChip: {
    fontWeight: 600,
    fontSize: "0.72rem",
  },
  linkIcon: {
    fontSize: 18,
    color: "text.secondary",
    "&:hover": { color: "primary.main" },
  },
  linkedInIcon: {
    fontSize: 18,
    color: "text.secondary",
    "&:hover": { color: "info.main" },
  },
};

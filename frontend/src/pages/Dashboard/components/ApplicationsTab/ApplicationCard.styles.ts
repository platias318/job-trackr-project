import type { SxProps, Theme } from "@mui/material";

interface IApplicationCardStyles {
  card: SxProps<Theme>;
  topRow: SxProps<Theme>;
  companyName: SxProps<Theme>;
  statusChip: SxProps<Theme>;
  notes: SxProps<Theme>;
  actions: SxProps<Theme>;
  linkButtons: SxProps<Theme>;
  iconButton: SxProps<Theme>;
}

export const applicationCardStyles: IApplicationCardStyles = {
  card: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 1,
  },
  companyName: {
    fontWeight: 600,
    overflowWrap: "anywhere",
  },
  statusChip: {
    fontWeight: 600,
    fontSize: "0.72rem",
    flexShrink: 0,
  },
  notes: {
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    mt: 0.5,
  },
  linkButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
  },
};

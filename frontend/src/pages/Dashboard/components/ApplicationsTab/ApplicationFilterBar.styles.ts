import type { SxProps, Theme } from "@mui/material";

interface IApplicationFilterBarStyles {
  container: SxProps<Theme>;
  chip: SxProps<Theme>;
  activeChip: SxProps<Theme>;
}

export const applicationFilterBarStyles: IApplicationFilterBarStyles = {
  container: {
    display: "flex",
    gap: 1,
    flexWrap: { xs: "nowrap", sm: "wrap" },
    overflowX: { xs: "auto", sm: "visible" },
    pb: { xs: 1, sm: 0 },
    mb: 3,
  },
  chip: {
    fontWeight: 400,
    flexShrink: 0,
  },
  activeChip: {
    fontWeight: 700,
    flexShrink: 0,
    color: "primary.contrastText",
  },
};

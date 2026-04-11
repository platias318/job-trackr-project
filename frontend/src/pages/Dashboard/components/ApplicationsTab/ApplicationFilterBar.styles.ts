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
    flexWrap: "wrap",
    mb: 3,
  },
  chip: {
    fontWeight: 400,
  },
  activeChip: {
    fontWeight: 700,
    color: "#fff",
  },
};

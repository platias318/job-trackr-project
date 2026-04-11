import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

interface ICVTabStyles {
  header: SxProps<Theme>;
  grid: SxProps<Theme>;
  emptyBox: SxProps<Theme>;
  emptyStateIcon: SxProps<Theme>;
}

export const cvTabStyles: ICVTabStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    },
    gap: 2,
  },
  emptyBox: {
    textAlign: "center",
    py: 8,
  },
  emptyStateIcon: {
    fontSize: 48,
    color: "text.disabled",
    mb: 1,
  },
};

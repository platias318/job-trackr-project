import type { SxProps, Theme } from "@mui/material";

interface IDashboardPageStyles {
  root: SxProps<Theme>;
  loadingContainer: SxProps<Theme>;
  container: SxProps<Theme>;
  section: SxProps<Theme>;
  tabs: SxProps<Theme>;
  welcome: SxProps<Theme>;
  email: SxProps<Theme>;
}

export const dashboardPageStyles: IDashboardPageStyles = {
  root: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100dvh",
  },
  container: {
    mt: 4,
  },
  section: {
    mt: 4,
  },
  tabs: {
    mb: 3,
    borderBottom: 1,
    borderColor: "divider",
  },
  welcome: {
    fontSize: { xs: "1.5rem", sm: "2.125rem" },
    overflowWrap: "anywhere",
  },
  email: {
    overflowWrap: "anywhere",
  },
};

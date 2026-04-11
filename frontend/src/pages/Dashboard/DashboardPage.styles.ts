import type { SxProps, Theme } from "@mui/material";

interface IDashboardPageStyles {
  loadingContainer: SxProps<Theme>;
  container: SxProps<Theme>;
  section: SxProps<Theme>;
  tabs: SxProps<Theme>;
}

export const dashboardPageStyles: IDashboardPageStyles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
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
};

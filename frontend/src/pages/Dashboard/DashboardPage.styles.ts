import type { SxProps, Theme } from "@mui/material";

interface IDashboardPageStyles {
  loadingContainer: SxProps<Theme>;
  appBarTitle: SxProps<Theme>;
  userName: SxProps<Theme>;
  container: SxProps<Theme>;
  section: SxProps<Theme>;
}

export const dashboardPageStyles: IDashboardPageStyles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  appBarTitle: {
    flexGrow: 1,
    fontWeight: 600,
  },
  userName: {
    mr: 2,
  },
  container: {
    mt: 4,
  },
  section: {
    mt: 4,
  },
};

import { Box, CircularProgress } from "@mui/material";

import { dashboardPageStyles } from "../DashboardPage.styles";

export const LoadingScreen = () => {
  return (
    <Box sx={dashboardPageStyles.loadingContainer}>
      <CircularProgress />
    </Box>
  );
};

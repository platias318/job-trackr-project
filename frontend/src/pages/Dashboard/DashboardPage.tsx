import { Box } from "@mui/material";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";
import { useAuth } from "@/hooks/useAuth";

import { DashboardPageContent } from "../Dashboard/components/DashboardPageContent";
import { dashboardPageStyles } from "./DashboardPage.styles";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={dashboardPageStyles.root}>
      <Navbar name={user?.name} onLogout={logout} />
      <Box flex={1}>
        <DashboardPageContent name={user?.name} email={user?.email} />
      </Box>
      <Footer />
    </Box>
  );
};

import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { dashboardPageStyles } from "../DashboardPage.styles";

interface IProps {
  name?: string;
  email?: string;
}

export const DashboardPageContent = ({ name, email }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={dashboardPageStyles.container}>
      <Typography variant="h4" gutterBottom>
        {t("Dashboard.welcome")}, {name}!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("Dashboard.email")}: {email}
      </Typography>
      <Box sx={dashboardPageStyles.section}>
        <Typography variant="h5" gutterBottom>
          {t("Dashboard.yourApplications")}
        </Typography>
        <Typography color="text.secondary">
          {t("Dashboard.addApplications")}
        </Typography>
      </Box>
    </Container>
  );
};

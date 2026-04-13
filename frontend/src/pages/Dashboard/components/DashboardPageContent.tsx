import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { dashboardPageStyles } from "../DashboardPage.styles";
import { ApplicationsTab } from "./ApplicationsTab/ApplicationsTab";
import { CVTab } from "./CVTab/CVTab";

interface IProps {
  name?: string;
  email?: string;
}

export const DashboardPageContent = ({ name, email }: IProps) => {
  const { t } = useTranslation();

  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={dashboardPageStyles.container}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t("Dashboard.welcome")}, {name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        {t("Dashboard.email")}: {email}
      </Typography>

      <Box sx={dashboardPageStyles.tabs}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={t("Dashboard.applications")} />
          <Tab label={t("Dashboard.myCVs")} />
        </Tabs>
      </Box>

      {tab === 0 && <ApplicationsTab />}
      {tab === 1 && <CVTab />}
    </Container>
  );
};

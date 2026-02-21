import { Box, Container, Typography } from "@mui/material";

import { dashboardPageStyles } from "../DashboardPage.styles";

interface IProps {
  name?: string;
  email?: string;
}

export const DashboardPageContent = ({ name, email }: IProps) => {
  return (
    <Container maxWidth="lg" sx={dashboardPageStyles.container}>
      <Typography variant="h4" gutterBottom>
        Welcome, {name}!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Email: {email}
      </Typography>
      <Box sx={dashboardPageStyles.section}>
        <Typography variant="h5" gutterBottom>
          Your Applications
        </Typography>
        <Typography color="text.secondary">
          No applications yet. Start adding your job applications!
        </Typography>
      </Box>
    </Container>
  );
};

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { dashboardPageStyles } from "../DashboardPage.styles";

interface IProps {
  name?: string;
  onLogout: () => void;
}

export const DashboardPageHeader = ({ name, onLogout }: IProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={dashboardPageStyles.appBarTitle}>
          Job Tracker
        </Typography>
        <Typography variant="body1" sx={dashboardPageStyles.userName}>
          {name}
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

import { Typography } from "@mui/material";

import { mainPageTextStyles } from "./MainPageText.styles";

export const MainPageText = () => (
  <>
    <Typography variant="h4" gutterBottom sx={mainPageTextStyles.heading}>
      Track all your job applications, interviews and offers in one place
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={mainPageTextStyles.subtitle}
    >
      Sign in to get started
    </Typography>
  </>
);

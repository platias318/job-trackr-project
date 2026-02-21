import { Typography } from "@mui/material";

import { heroTextStyles } from "./HeroText.styles";

export const HeroText = () => (
  <>
    <Typography variant="h4" gutterBottom sx={heroTextStyles.heading}>
      Track all your job applications, interviews and offers in one place
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={heroTextStyles.subtitle}
    >
      Sign in to get started
    </Typography>
  </>
);

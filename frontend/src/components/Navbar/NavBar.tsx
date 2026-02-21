import { Box, Typography } from "@mui/material";

import { navbarStyles } from "./NavBar.styles";

export const Navbar = () => (
  <Box component="nav" sx={navbarStyles.root}>
    <Box sx={navbarStyles.icon}></Box>
    <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
      Job Trackr
    </Typography>
  </Box>
);

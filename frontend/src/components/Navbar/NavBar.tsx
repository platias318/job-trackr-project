import { WorkOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { navbarStyles } from "./NavBar.styles";

interface IProps {
  name?: string;
  onLogout?: () => void;
}

export const Navbar = ({ name, onLogout }: IProps) => {
  const navigate = useNavigate();

  return (
    <Box component="nav" sx={navbarStyles.root}>
      <Box sx={navbarStyles.brand} onClick={() => navigate("/")}>
        <Box sx={navbarStyles.icon} className="brand-icon">
          <WorkOutline fontSize="inherit" />
        </Box>
        <Typography
          className="brand-text"
          variant="h6"
          fontWeight={700}
          letterSpacing={-0.5}
          sx={navbarStyles.brandText}
        >
          Job Trackr
        </Typography>
      </Box>

      {name && onLogout && (
        <Box sx={navbarStyles.rightSlot}>
          <Typography sx={navbarStyles.userName}>{name}</Typography>
          <Button
            disableRipple
            sx={navbarStyles.logoutButton}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

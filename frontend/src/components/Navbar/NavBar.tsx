import { WorkOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import i18n from "@/i18n";

import { navbarStyles } from "./NavBar.styles";

interface IProps {
  name?: string;
  onLogout?: () => void;
}

export const Navbar = ({ name, onLogout }: IProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "el" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box component="nav" sx={navbarStyles.root}>
      <Box
        sx={navbarStyles.brand}
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
      >
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
      <Box sx={navbarStyles.rightSlot}>
        <Button
          disableRipple
          sx={navbarStyles.languageButton}
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "GR" : "EN"}
        </Button>

        {name && onLogout && (
          <>
            <Typography sx={navbarStyles.userName}>{name}</Typography>
            <Button
              disableRipple
              sx={navbarStyles.logoutButton}
              onClick={onLogout}
            >
              {t("Navigation.logout")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

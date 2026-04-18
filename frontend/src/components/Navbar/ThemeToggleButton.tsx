import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useThemeMode } from "@/hooks/useThemeMode";

export const ThemeToggleButton = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <Tooltip
      title={isDark ? t("Navigation.lightMode") : t("Navigation.darkMode")}
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};

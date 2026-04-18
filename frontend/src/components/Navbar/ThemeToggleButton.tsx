import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";

import { useThemeMode } from "@/hooks/useThemeMode";

export const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={isDark ? "Light mode" : "Dark mode"}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};

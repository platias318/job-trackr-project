import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "@/App.tsx";
import { useThemeMode } from "@/hooks/useThemeMode";
import { getTheme } from "@/theme/theme";

export const ThemedApp = () => {
  const { isDark } = useThemeMode();

  return (
    <ThemeProvider theme={getTheme(isDark)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

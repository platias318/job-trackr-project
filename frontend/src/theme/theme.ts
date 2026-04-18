import { createTheme } from "@mui/material/styles";

export const getTheme = (isDark: boolean) =>
  createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#6366f1",
        light: "#818cf8",
        dark: "#4f46e5",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ec4899",
        light: "#f472b6",
        dark: "#db2777",
        contrastText: "#ffffff",
      },
      background: {
        default: isDark ? "#0f172a" : "#f8fafc",
        paper: isDark ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f1f5f9" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#64748b",
        disabled: isDark ? "#475569" : "#94a3b8",
      },
      error: {
        main: "#ef4444",
        light: "#fca5a5",
        dark: "#dc2626",
      },
      warning: {
        main: "#f59e0b",
        light: "#fcd34d",
        dark: "#d97706",
      },
      success: {
        main: "#10b981",
        light: "#6ee7b7",
        dark: "#059669",
      },
      info: {
        main: "#3b82f6",
        light: "#93c5fd",
        dark: "#2563eb",
      },
      divider: isDark ? "#1e293b" : "#e2e8f0",
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderColor: isDark ? "#334155" : "#e2e8f0",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#334155" : "#e2e8f0",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#334155" : "#e2e8f0",
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#334155" : "#e2e8f0",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

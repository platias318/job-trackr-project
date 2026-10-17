import type { Interpolation, Theme } from "@mui/material";

export const toastGlobalStyles: Interpolation<Theme> = {
  ".Toastify__toast-container--bottom-center": {
    width: "auto",
    maxWidth: "calc(100vw - 32px)",
    bottom: "calc(16px + env(safe-area-inset-bottom))",
    padding: 0,
  },
  ".Toastify__toast.app-toast": {
    borderRadius: "24px",
    minHeight: "fit-content",
    padding: "10px 22px 10px 16px",
    marginBottom: 10,
    fontSize: "0.9rem",
    fontWeight: 600,
    border: "1px solid rgba(128, 128, 128, 0.25)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
  },
  ".Toastify__toast.app-toast .Toastify__toast-icon": {
    marginInlineEnd: 10,
  },
};

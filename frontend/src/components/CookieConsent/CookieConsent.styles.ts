import type { SxProps, Theme } from "@mui/material";

interface ICookieConsentStyles {
  root: SxProps<Theme>;
  paper: SxProps<Theme>;
  text: SxProps<Theme>;
}

export const cookieConsentStyles: ICookieConsentStyles = {
  root: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: (theme) => theme.zIndex.snackbar,
    display: "flex",
    justifyContent: "center",
    px: 2,
    pb: "calc(16px + env(safe-area-inset-bottom))",
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
    maxWidth: 640,
    width: "100%",
    p: 2,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "center" },
    gap: 2,
    backgroundColor: "background.paper",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
  },
  text: {
    flex: 1,
  },
};

import type { SxProps, Theme } from "@mui/material";

interface IPrivacyPageStyles {
  root: SxProps<Theme>;
  container: SxProps<Theme>;
  content: SxProps<Theme>;
  hero: SxProps<Theme>;
  divider: SxProps<Theme>;
  section: SxProps<Theme>;
  sectionTitle: SxProps<Theme>;
}

export const privacyPageStyles: IPrivacyPageStyles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.default",
  },
  container: {
    flex: 1,
    py: 8,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },
  divider: {
    borderColor: "divider",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
  },
};

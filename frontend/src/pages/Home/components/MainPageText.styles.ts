import type { SxProps, Theme } from "@mui/material";

interface IMainPageTextStyles {
  heading: SxProps<Theme>;
  subtitle: SxProps<Theme>;
}

export const mainPageTextStyles: IMainPageTextStyles = {
  heading: {
    fontWeight: 800,
    textAlign: "center",
    fontSize: { xs: "1.75rem", sm: "2.4rem" },
    lineHeight: 1.2,
    backgroundImage: (theme: Theme) =>
      `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "primary.main",
  },
  subtitle: {
    textAlign: "center",
    mb: 4,
  },
};

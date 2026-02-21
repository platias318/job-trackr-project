import type { SxProps, Theme } from "@mui/material";

interface IMainPageTextStyles {
  heading: SxProps<Theme>;
  subtitle: SxProps<Theme>;
}

export const mainPageTextStyles: IMainPageTextStyles = {
  heading: {
    fontWeight: 700,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    mb: 4,
  },
};

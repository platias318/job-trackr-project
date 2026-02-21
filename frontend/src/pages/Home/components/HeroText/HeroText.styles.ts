import type { SxProps, Theme } from "@mui/material";

interface IHeroTextStyles {
  heading: SxProps<Theme>;
  subtitle: SxProps<Theme>;
}

export const heroTextStyles: IHeroTextStyles = {
  heading: {
    fontWeight: 700,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    mb: 4,
  },
};

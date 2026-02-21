import type { SxProps, Theme } from "@mui/material";

interface INavbarStyles {
  root: SxProps<Theme>;
  icon: SxProps<Theme>;
}

export const navbarStyles: INavbarStyles = {
  root: {
    borderBottom: "1px solid",
    borderColor: "divider",
    px: 4,
    py: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  icon: {
    color: "primary.main",
    display: "flex",
    alignItems: "center",
  },
};

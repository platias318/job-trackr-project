import type { SxProps, Theme } from "@mui/material";

interface INavbarStyles {
  root: SxProps<Theme>;
  icon: SxProps<Theme>;
  brand: SxProps<Theme>;
  brandText: SxProps<Theme>;
  rightSlot: SxProps<Theme>;
  languageButton: SxProps<Theme>;
  userName: SxProps<Theme>;
  logoutButton: SxProps<Theme>;
}

export const navbarStyles: INavbarStyles = {
  root: {
    borderBottom: "1px solid",
    borderColor: "divider",
    px: 4,
    py: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "primary.main",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
    "& .brand-icon": {
      transition: "transform 0.40s ease, color 0.40s ease",
    },
    "& .brand-text": {
      transition: "color 0.40s ease",
    },
    "&:hover .brand-icon": {
      transform: "rotate(-8deg) scale(1.15)",
      color: "rgba(225, 225, 224, 0.97)",
    },
    "&:hover .brand-text": {
      color: "rgba(225, 225, 224, 0.95)",
    },
  },
  icon: {
    color: "white",
    display: "flex",
    alignItems: "center",
    fontSize: 22,
  },
  brandText: {
    color: "white",
    transition: "color 0.40s ease",
  },
  rightSlot: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  languageButton: {
    color: "white",
    padding: 0,
    fontSize: "1rem",
    textTransform: "none",
    backgroundColor: "transparent",
    "&:hover": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  userName: {
    color: "white",
    fontSize: "1rem",
  },
  logoutButton: {
    color: "white",
    padding: 0,
    fontSize: "1rem",
    textTransform: "none",
    transition: "color 0.40s ease",
    "&:hover": {
      color: "rgba(225, 225, 224, 0.95)",
      background: "transparent",
    },
  },
};

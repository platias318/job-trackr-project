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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid",
    borderColor: "divider",
    bgcolor: "primary.main",
    px: { xs: 2, sm: 3, md: 4 },
    py: 2,
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
      color: "text.primary",
    },
    "&:hover .brand-text": {
      color: "text.primary",
    },
  },
  icon: {
    color: "text.primary",
    display: "flex",
    alignItems: "center",
    fontSize: 22,
  },
  brandText: {
    color: "text.primary",
    fontSize: { xs: "1rem", sm: "1.25rem" },
  },
  rightSlot: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    flexWrap: { xs: "wrap", sm: "nowrap" },
    justifyContent: "flex-end",
  },
  languageButton: {
    color: "text.primary",
    padding: "4px 6px",
    minWidth: 36,
    fontSize: "0.9rem",
    textTransform: "none",
    backgroundColor: "transparent",
    "&:hover": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  userName: {
    display: { xs: "none", sm: "block" },
    color: "text.primary",
    fontSize: "0.95rem",
    fontWeight: "bold",
  },
  logoutButton: {
    color: "text.primary",
    padding: 0,
    fontSize: "0.9rem",
    textTransform: "none",
    "&:hover": {
      color: "text.primary",
      background: "transparent",
    },
  },
};

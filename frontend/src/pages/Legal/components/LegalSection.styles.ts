import type { SxProps, Theme } from "@mui/material";

interface ILegalSectionStyles {
  section: SxProps<Theme>;
  sectionTitle: SxProps<Theme>;
  divider: SxProps<Theme>;
}

export const legalSectionStyles: ILegalSectionStyles = {
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

import type { SxProps, Theme } from "@mui/material";

interface IFooterStyles {
  inner: SxProps<Theme>;
  links: SxProps<Theme>;
}

export const footerStyles: IFooterStyles = {
  inner: {
    py: 3,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: { xs: "center", sm: "space-between" },
    textAlign: { xs: "center", sm: "left" },
    gap: 2,
  },
  links: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: { xs: "center", sm: "flex-end" },
  },
};

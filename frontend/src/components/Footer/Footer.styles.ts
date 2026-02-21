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
    justifyContent: "space-between",
    gap: 2,
  },
  links: {
    display: "flex",
    gap: 3,
  },
};

import type { SxProps, Theme } from "@mui/material";

interface IHomePageStyles {
  root: SxProps<Theme>;
  container: SxProps<Theme>;
  content: SxProps<Theme>;
}

export const homePageStyles: IHomePageStyles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 128px)",
    py: 6,
  },
};

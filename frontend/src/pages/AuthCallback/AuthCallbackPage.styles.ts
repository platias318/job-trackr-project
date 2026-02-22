import type { SxProps, Theme } from "@mui/material";

interface IAuthCallbackPageStyles {
  root: SxProps<Theme>;
}

export const authCallbackPageStyles: IAuthCallbackPageStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

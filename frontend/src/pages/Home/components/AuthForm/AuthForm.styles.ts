import type { SxProps, Theme } from "@mui/material";

interface IAuthFormStyles {
  root: SxProps<Theme>;
  googleButton: SxProps<Theme>;
  divider: SxProps<Theme>;
}

export const authFormStyles: IAuthFormStyles = {
  root: {
    width: "100%",
  },
  googleButton: {
    mb: 2,
  },
  divider: {
    my: 2,
  },
};

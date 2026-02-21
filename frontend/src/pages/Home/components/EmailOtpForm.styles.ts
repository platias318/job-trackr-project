import type { SxProps, Theme } from "@mui/material";

interface IEmailOtpFormStyles {
  alert: SxProps<Theme>;
  textField: SxProps<Theme>;
  primaryButton: SxProps<Theme>;
}

export const emailOtpFormStyles: IEmailOtpFormStyles = {
  alert: {
    mb: 2,
  },
  textField: {
    mb: 2,
  },
  primaryButton: {
    mb: 1,
  },
};

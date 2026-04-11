import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

interface IDeleteCVDialogStyles {
  actions: SxProps<Theme>;
}

export const deleteCVDialogStyles: IDeleteCVDialogStyles = {
  actions: {
    px: 3,
    pb: 2,
  },
};

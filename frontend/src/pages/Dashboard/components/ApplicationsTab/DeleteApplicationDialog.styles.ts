import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

interface IDeleteApplicationDialogStyles {
  actions: SxProps<Theme>;
}

export const deleteApplicationDialogStyles: IDeleteApplicationDialogStyles = {
  actions: {
    px: 3,
    pb: 2,
  },
};

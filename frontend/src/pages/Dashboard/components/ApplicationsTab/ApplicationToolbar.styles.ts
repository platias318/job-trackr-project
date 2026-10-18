import type { SxProps, Theme } from "@mui/material";

interface IApplicationToolbarStyles {
  root: SxProps<Theme>;
  search: SxProps<Theme>;
  sort: SxProps<Theme>;
}

export const applicationToolbarStyles: IApplicationToolbarStyles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    mb: 2,
  },
  search: {
    flex: "1 1 240px",
  },
  sort: {
    flex: "0 1 240px",
    minWidth: 200,
  },
};

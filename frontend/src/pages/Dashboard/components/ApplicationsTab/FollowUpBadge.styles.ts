import type { SxProps, Theme } from "@mui/material";

interface IFollowUpBadgeStyles {
  chip: SxProps<Theme>;
}

export const followUpBadgeStyles: IFollowUpBadgeStyles = {
  chip: {
    fontWeight: 600,
    fontSize: "0.72rem",
  },
};

import type { SxProps, Theme } from "@mui/material";

interface IApplicationTabStyles {
  header: SxProps<Theme>;
  emptyStateIcon: SxProps<Theme>;
  emptyBox: SxProps<Theme>;
  noResultsBox: SxProps<Theme>;
  skeletonStack: SxProps<Theme>;
}
export const applicationsTabStyles: IApplicationTabStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
  },
  emptyStateIcon: {
    fontSize: 48,
    color: "text.disabled",
    mb: 1,
  },
  emptyBox: {
    textAlign: "center",
    py: 8,
  },
  noResultsBox: {
    textAlign: "center",
    py: 4,
  },
  skeletonStack: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
};

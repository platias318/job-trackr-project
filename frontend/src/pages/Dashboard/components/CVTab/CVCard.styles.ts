import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

interface ICVCardStyles {
  card: SxProps<Theme>;
  cardContent: SxProps<Theme>;
  defaultBadge: SxProps<Theme>;
  cardActions: SxProps<Theme>;
  metaRow: SxProps<Theme>;
  notesText: SxProps<Theme>;
}

export const cvCardStyles: ICVCardStyles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: 4,
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  defaultBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  cardActions: {
    justifyContent: "flex-end",
    pt: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    mt: 0.5,
  },
  notesText: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

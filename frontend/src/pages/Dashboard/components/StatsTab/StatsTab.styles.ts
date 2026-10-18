import type { SxProps, Theme } from "@mui/material";

interface IStatsTabStyles {
  kpiGrid: SxProps<Theme>;
  kpiCard: SxProps<Theme>;
  kpiValue: SxProps<Theme>;
  panelGrid: SxProps<Theme>;
  panel: SxProps<Theme>;
  barRow: SxProps<Theme>;
  barLabel: SxProps<Theme>;
  barTrack: SxProps<Theme>;
  barFill: SxProps<Theme>;
  barCount: SxProps<Theme>;
  weekChart: SxProps<Theme>;
  weekColumn: SxProps<Theme>;
  weekBar: SxProps<Theme>;
  emptyBox: SxProps<Theme>;
}

export const statsTabStyles: IStatsTabStyles = {
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
    gap: 2,
    mb: 3,
  },
  kpiCard: {
    p: 2,
    borderRadius: 3,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  kpiValue: {
    fontWeight: 800,
    lineHeight: 1.1,
    fontSize: { xs: "1.75rem", sm: "2.25rem" },
  },
  panelGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 2,
  },
  panel: {
    p: 2.5,
    borderRadius: 3,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  barRow: {
    display: "grid",
    gridTemplateColumns: "minmax(90px, 130px) 1fr 28px",
    alignItems: "center",
    gap: 1.5,
    mb: 1.25,
  },
  barLabel: {
    fontSize: "0.85rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  barTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "action.hover",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
    transformOrigin: "left",
    animation: "statsGrowX 600ms ease-out both",
    "@keyframes statsGrowX": {
      from: { transform: "scaleX(0)" },
      to: { transform: "scaleX(1)" },
    },
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  },
  barCount: {
    fontSize: "0.85rem",
    fontWeight: 700,
    textAlign: "right",
  },
  weekChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: { xs: 0.75, sm: 1.5 },
    height: 180,
    pt: 2,
  },
  weekColumn: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 0.5,
    minWidth: 0,
  },
  weekBar: {
    width: "100%",
    maxWidth: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "primary.main",
    transformOrigin: "bottom",
    animation: "statsGrowY 600ms ease-out both",
    "@keyframes statsGrowY": {
      from: { transform: "scaleY(0)" },
      to: { transform: "scaleY(1)" },
    },
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  },
  emptyBox: {
    textAlign: "center",
    py: 8,
  },
};

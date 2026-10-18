import { alpha, type SxProps, type Theme } from "@mui/material";

interface IHomePageStyles {
  root: SxProps<Theme>;
  container: SxProps<Theme>;
  content: SxProps<Theme>;
  hero: SxProps<Theme>;
  card: SxProps<Theme>;
}

const fadeUp = (delayMs: number) => ({
  animation: `homeFadeUp 700ms ${delayMs}ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
  "@keyframes homeFadeUp": {
    from: { opacity: 0, transform: "translateY(18px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});

export const homePageStyles: IHomePageStyles = {
  root: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    backgroundImage: (theme: Theme) =>
      `radial-gradient(circle at 15% 10%, ${alpha(theme.palette.primary.main, 0.3)}, transparent 45%),
     radial-gradient(circle at 85% 90%, ${alpha(theme.palette.secondary.main, 0.25)}, transparent 45%)`,
    backgroundAttachment: "fixed",
  },
  container: {
    flex: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100dvh - 128px)",
    py: 6,
  },
  hero: fadeUp(0),
  card: {
    width: "100%",
    p: { xs: 3, sm: 4 },
    borderRadius: 4,
    border: "1px solid",
    borderColor: (theme: Theme) => alpha(theme.palette.divider, 0.6),
    backgroundColor: (theme: Theme) =>
      alpha(
        theme.palette.background.paper,
        theme.palette.mode === "dark" ? 0.6 : 0.72,
      ),
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: (theme: Theme) =>
      `0 20px 60px ${alpha(theme.palette.primary.main, 0.18)}`,
    ...fadeUp(150),
  },
};

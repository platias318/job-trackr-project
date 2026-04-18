import { useEffect, useState } from "react";

import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
  );
};

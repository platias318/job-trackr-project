import { createContext } from "react";

interface IProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IProps>({
  isDark: false,
  toggleTheme: () => {},
});

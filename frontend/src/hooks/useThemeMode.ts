// eslint-disable-next-line react-x/no-use-context
import { useContext } from "react";

import { ThemeContext } from "@/context/ThemeContext";

// eslint-disable-next-line react-x/no-use-context
export const useThemeMode = () => useContext(ThemeContext);

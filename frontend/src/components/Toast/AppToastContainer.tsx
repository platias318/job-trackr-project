import { GlobalStyles } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";

import { useThemeMode } from "@/hooks/useThemeMode";

import { toastGlobalStyles } from "./AppToastContainer.styles";

const AUTO_CLOSE = 3000; // 3 seconds
export const AppToastContainer = () => {
  const { isDark } = useThemeMode();

  return (
    <>
      <GlobalStyles styles={toastGlobalStyles} />
      <ToastContainer
        position="bottom-center"
        autoClose={AUTO_CLOSE}
        hideProgressBar
        closeButton={false}
        transition={Slide}
        toastClassName="app-toast"
        theme={isDark ? "dark" : "light"}
        newestOnTop
      />
    </>
  );
};

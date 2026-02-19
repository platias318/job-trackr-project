import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  updateClearUser,
  updateUser,
} from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/stores/hooks";

export const AuthCallbackPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      navigate("/login");
      return;
    }

    // Exchange code for cookie, then fetch user
    authService
      .exchange(code)
      .then(() => authService.getCurrentUser())
      .then((userData) => {
        dispatch(updateUser(userData));
        navigate("/dashboard");
      })
      .catch(() => {
        dispatch(updateClearUser());
        navigate("/login");
      });
  }, [navigate, dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

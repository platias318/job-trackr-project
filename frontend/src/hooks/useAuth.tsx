// hooks/useAuth.ts
import { useEffect } from "react";

import {
  selectIsAuthLoading,
  selectIsUserAuthenticated,
  selectUser,
  updateClearUser,
  updateIsLoading,
  updateUser,
} from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
  const isLoading = useAppSelector(selectIsAuthLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch(updateIsLoading(true));
        const userData = await authService.getCurrentUser();
        dispatch(updateUser(userData));
      } catch {
        console.log("User not authenticated");
        dispatch(updateClearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  const logout = async () => {
    try {
      await authService.logout();
      dispatch(updateClearUser());
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { user, isAuthenticated, isLoading, logout };
};

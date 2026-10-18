import { useEffect } from "react";

import {
  selectIsAuthLoading,
  selectIsUserAuthenticated,
  selectUser,
  updateClearUser,
  updateUser,
} from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

// Call ONCE at the top of the app. It asks the backend who the current user is
// (via the session cookie) and fills the store. isAuthLoading stays true until
// the answer arrives, so route guards can wait instead of guessing.
export const useAuthBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // The OAuth callback page establishes the session itself. Checking here
    // too would race with it and could clear the user it just set.
    if (window.location.pathname === "/auth/callback") return;

    let cancelled = false;

    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (!cancelled) dispatch(updateUser(userData));
      } catch {
        if (!cancelled) dispatch(updateClearUser());
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);
};

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
  const isLoading = useAppSelector(selectIsAuthLoading);

  const logout = async () => {
    try {
      await authService.logout();
      dispatch(updateClearUser());
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { user, isAuthenticated, isLoading, logout };
};

import type { JSX } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/pages/Dashboard/components/LoadingScreen";

interface IProps {
  children: React.ReactNode;
}

// For public pages a returning user with a valid session goes
// straight to the dashboard instead of seeing the login screen again.
export const RedirectIfAuthenticated = ({ children }: IProps): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

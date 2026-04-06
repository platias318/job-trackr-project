import { type JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/pages/Dashboard/components/LoadingScreen";

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProps): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null!;

  return <>{children}</>;
};

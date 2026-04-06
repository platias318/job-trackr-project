import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "@/components/Navbar/NavBar";
import { useAuth } from "@/hooks/useAuth";

import { DashboardPageContent } from "../Dashboard/components/DashboardPageContent";
import { LoadingScreen } from "../Dashboard/components/LoadingScreen";

export const DashboardPage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) return null;

  return (
    <>
      <Navbar name={user?.name} onLogout={logout} />
      <DashboardPageContent name={user?.name} email={user?.email} />
    </>
  );
};

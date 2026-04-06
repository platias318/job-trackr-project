import { Navbar } from "@/components/Navbar/NavBar";
import { useAuth } from "@/hooks/useAuth";

import { DashboardPageContent } from "../Dashboard/components/DashboardPageContent";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar name={user?.name} onLogout={logout} />
      <DashboardPageContent name={user?.name} email={user?.email} />
    </>
  );
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
export default App;

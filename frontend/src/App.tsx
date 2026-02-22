import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { AuthCallbackPage } from "./pages/AuthCallback/AuthCallbackPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { HomePage } from "./pages/Home/HomePage";

function App() {
  useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
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

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
function App() {
  return (
    <div>
      Your frontend is running my man, cogradulations!!!!
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <div>Hey bro!</div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
export default App;

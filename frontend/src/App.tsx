import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Button, Typography, Container } from "@mui/material";

function App() {
  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Hello MUI
        </Typography>
        <Button variant="contained">Click Me</Button>
      </Container>
      Your frontend is running my man, cogradulations!!!!
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;

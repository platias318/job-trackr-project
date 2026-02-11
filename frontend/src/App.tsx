import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useState, useEffect } from "react";
import { apiService } from "./services/api";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

function App() {
  const [data, setData] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const healthData = await apiService.healthCheck();
      setHealth(healthData);
    } catch (err) {
      setError("Failed to connect to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData = await apiService.getApiData();
      setData(apiData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Frontend + Backend Connection
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Backend Health
        </Typography>
        {health ? (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="success" />
              <Typography>
                Status:{" "}
                <Chip label={health.status} color="success" size="small" />
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Timestamp: {new Date(health.timestamp).toLocaleString()}
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography color="text.secondary">
              Checking connection...
            </Typography>
          </Box>
        )}
      </Paper>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={fetchData}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
        >
          {loading ? "Loading..." : "Fetch API Data"}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {data && (
        <Paper elevation={2} sx={{ p: 3, bgcolor: "success.light" }}>
          <Typography variant="h5" gutterBottom>
            API Response
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Message:</strong> {data.message}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Items:</strong>
          </Typography>
          <List dense>
            {data.items.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Analytics />
      <SpeedInsights />
    </Container>
  );
}
export default App;

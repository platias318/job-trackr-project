import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h2" gutterBottom>
          Job Application Tracker
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Track your job applications, interviews, and offers in one place
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

import { Box, Button, Container, Paper, Typography } from "@mui/material";

export const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Track your job applications efficiently
          </Typography>
          <Button
            variant="contained"
            fullWidth
            size="large"
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            sx={{ mt: 2 }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

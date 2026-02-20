import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser } from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/stores/hooks";
import type { EmailStep } from "@/types/login.types";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [emailStep, setEmailStep] = useState<EmailStep>("input");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!email) return;
    setIsLoading(true);
    setError(null);
    try {
      await authService.sendCode(email);
      setEmailStep("code");
    } catch {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyCode(email, code);
      const userData = await authService.getCurrentUser();
      dispatch(updateUser(userData));
      navigate("/dashboard");
    } catch {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Track your job applications efficiently
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {emailStep === "input" ? (
            <>
              <TextField
                label="Email address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleSendCode}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Send verification code"
                )}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" mb={2}>
                We sent a 6-digit code to <strong>{email}</strong>. It expires
                in 10 minutes.
              </Typography>
              <TextField
                label="Verification code"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleVerifyCode}
                disabled={isLoading || code.length !== 6}
                sx={{ mb: 1 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Verify code"}
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={() => {
                  setEmailStep("input");
                  setCode("");
                  setError(null);
                }}
              >
                Use a different email
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

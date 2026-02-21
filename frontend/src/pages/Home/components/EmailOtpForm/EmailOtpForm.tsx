import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser } from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/stores/hooks";
import type { EmailStep } from "@/types/login.types";

import { emailOtpFormStyles } from "./EmailOtpForm.styles";

export const EmailOtpForm = () => {
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

  const handleReset = () => {
    setEmailStep("input");
    setCode("");
    setError(null);
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (emailStep === "input") {
    return (
      <>
        {error && (
          <Alert severity="error" sx={emailOtpFormStyles.alert}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
          sx={emailOtpFormStyles.textField}
        />
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleSendCode}
          disabled={isLoading || !email}
          sx={emailOtpFormStyles.primaryButton}
        >
          {isLoading ? <CircularProgress size={24} /> : "Continue with email"}
        </Button>
      </>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={emailOtpFormStyles.alert}>
          {error}
        </Alert>
      )}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={emailOtpFormStyles.textField}
      >
        Enter the code generated from the link sent to <strong>{email}</strong>.
        It expires in 10 minutes.
      </Typography>
      <TextField
        label="Enter verification code"
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
        inputProps={{ maxLength: 6 }}
        sx={emailOtpFormStyles.textField}
      />
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleVerifyCode}
        disabled={isLoading || code.length !== 6}
        sx={emailOtpFormStyles.primaryButton}
      >
        {isLoading ? <CircularProgress size={24} /> : "Verify email address"}
      </Button>
      <Button variant="text" fullWidth onClick={handleReset}>
        Use a different email
      </Button>
    </>
  );
};

import { Alert, Button, CircularProgress, TextField } from "@mui/material";

import { emailOtpFormStyles } from "./EmailOtpForm.styles";

interface IProps {
  email: string;
  isLoading: boolean;
  error: string | null;
  setEmail: (value: string) => void;
  onSubmit: () => void;
}

export const EmailInputStep = ({
  email,
  isLoading,
  error,
  setEmail,
  onSubmit,
}: IProps) => (
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
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      sx={emailOtpFormStyles.textField}
    />
    <Button
      variant="outlined"
      fullWidth
      size="large"
      onClick={onSubmit}
      disabled={isLoading || !email}
      sx={emailOtpFormStyles.primaryButton}
    >
      {isLoading ? <CircularProgress size={24} /> : "Continue with email"}
    </Button>
  </>
);

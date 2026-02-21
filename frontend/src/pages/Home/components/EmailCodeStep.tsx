import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { emailOtpFormStyles } from "./EmailOtpForm.styles";

interface IProps {
  email: string;
  code: string;
  isLoading: boolean;
  error: string | null;
  setCode: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const EmailCodeStep = ({
  email,
  code,
  isLoading,
  error,
  setCode,
  onSubmit,
  onReset,
}: IProps) => (
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
      Enter the code sent to <strong>{email}</strong>. It expires in 10 minutes.
    </Typography>
    <TextField
      label="Enter verification code"
      fullWidth
      value={code}
      onChange={(e) => setCode(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      inputProps={{ maxLength: 6 }}
      sx={emailOtpFormStyles.textField}
    />
    <Button
      variant="contained"
      fullWidth
      size="large"
      onClick={onSubmit}
      disabled={isLoading || code.length !== 6}
      sx={emailOtpFormStyles.primaryButton}
    >
      {isLoading ? <CircularProgress size={24} /> : "Verify email address"}
    </Button>
    <Button variant="text" fullWidth onClick={onReset}>
      Use a different email
    </Button>
  </>
);

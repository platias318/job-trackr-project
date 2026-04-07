import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

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
}: IProps) => {
  const { t } = useTranslation();

  return (
    <>
      {error && (
        <Alert severity="error" sx={emailOtpFormStyles.alert}>
          {error}
        </Alert>
      )}
      <TextField
        label={t("HomePage.emailAddress")}
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
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          t("HomePage.continueWithEmail")
        )}
      </Button>
    </>
  );
};

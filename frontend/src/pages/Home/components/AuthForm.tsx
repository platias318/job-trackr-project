import { Box, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

import { GoogleIcon24 } from "@/assets/icons";

import { authFormStyles } from "./AuthForm.styles";
import { EmailOtpForm } from "./EmailOtpForm";
export const AuthForm = () => {
  const { t } = useTranslation();

  return (
    <Box sx={authFormStyles.root}>
      <Button
        variant="contained"
        fullWidth
        size="large"
        href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
        sx={authFormStyles.googleButton}
      >
        <GoogleIcon24 />
        {t("HomePage.continueWithGoogle")}
      </Button>
      <Divider sx={authFormStyles.divider}>{t("HomePage.or")}</Divider>
      <EmailOtpForm />
    </Box>
  );
};

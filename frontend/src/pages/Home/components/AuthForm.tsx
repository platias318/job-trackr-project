import { Box, Button, Divider } from "@mui/material";

import { GoogleIcon24 } from "@/assets/icons";

import { authFormStyles } from "./AuthForm.styles";
import { EmailOtpForm } from "./EmailOtpForm";
export const AuthForm = () => (
  <Box sx={authFormStyles.root}>
    <Button
      variant="contained"
      fullWidth
      size="large"
      href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
      sx={authFormStyles.googleButton}
    >
      <GoogleIcon24 />
      Continue with google
    </Button>
    <Divider sx={authFormStyles.divider}>or</Divider>
    <EmailOtpForm />
  </Box>
);

import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { useCookieConsent } from "@/hooks/useCookieConsent";

import { cookieConsentStyles } from "./CookieConsent.styles";

export const CookieConsent = () => {
  const { t } = useTranslation();

  const { accepted, accept } = useCookieConsent();

  if (accepted) return null;

  return (
    <Box
      sx={cookieConsentStyles.root}
      role="dialog"
      aria-label={t("CookieConsent.title")}
    >
      <Paper elevation={6} sx={cookieConsentStyles.paper}>
        <Typography variant="body2" sx={cookieConsentStyles.text}>
          {t("CookieConsent.message")}{" "}
          <Link component={RouterLink} to="/legal/privacy">
            {t("CookieConsent.learnMore")}
          </Link>
        </Typography>
        <Button variant="contained" onClick={accept}>
          {t("CookieConsent.accept")}
        </Button>
      </Paper>
    </Box>
  );
};

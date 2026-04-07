import { Box, Container, Divider, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { footerStyles } from "./Footer.styles";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { label: t("Footer.privacyPolicy"), href: "/legal/privacy" },
    { label: t("Footer.termsOfService"), href: "/legal/terms" },
    { label: t("Footer.contact"), href: "mailto:platiaskostas318@gmail.com" },
  ];

  return (
    <Box component="footer" mt="auto">
      <Divider />
      <Container maxWidth="lg">
        <Box sx={footerStyles.inner}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {t("jobTrackrProject")}
            {". "} {t("Footer.allRightsReserved")}
          </Typography>
          <Box sx={footerStyles.links}>
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {label}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

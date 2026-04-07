import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { LegalSection } from "../components/LegalSection";
import { termsPageStyles } from "./TermsPage.styles";

export const TermsPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("Legal.Terms.useOfServiceTitle"),
      body: t("Legal.Terms.useOfServiceBody"),
    },
    {
      title: t("Legal.Terms.userResponsibilitiesTitle"),
      body: t("Legal.Terms.userResponsibilitiesBody"),
    },
    {
      title: t("Legal.Terms.limitationOfLiabilityTitle"),
      body: t("Legal.Terms.limitationOfLiabilityBody"),
    },
    {
      title: t("Legal.Terms.changesToTermsTitle"),
      body: t("Legal.Terms.changesToTermsBody"),
    },
  ];

  return (
    <Box sx={termsPageStyles.root}>
      <Navbar />
      <Container maxWidth="md" sx={termsPageStyles.container}>
        <Box sx={termsPageStyles.content}>
          <Box sx={termsPageStyles.hero}>
            <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
              {t("Legal.Terms.termsOfService")}
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              {t("Legal.Terms.termsAgree")}
            </Typography>
          </Box>
          {sections.map((section) => (
            <LegalSection
              key={section.title}
              title={section.title}
              body={section.body}
            />
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

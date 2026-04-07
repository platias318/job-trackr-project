import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { LegalSection } from "../components/LegalSection";
import { privacyPageStyles } from "./PrivacyPage.styles";

export const PrivacyPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("Legal.Privacy.informationCollectTitle"),
      body: t("Legal.Privacy.informationCollectBody"),
    },
    {
      title: t("Legal.Privacy.passwordsTitle"),
      body: t("Legal.Privacy.passwordsBody"),
    },
    {
      title: t("Legal.Privacy.howWeUseInformationTitle"),
      body: t("Legal.Privacy.howWeUseInformationBody"),
    },
    {
      title: t("Legal.Privacy.dataSecurityTitle"),
      body: t("Legal.Privacy.dataSecurityBody"),
    },
  ];

  return (
    <Box sx={privacyPageStyles.root}>
      <Navbar />
      <Container maxWidth="md" sx={privacyPageStyles.container}>
        <Box sx={privacyPageStyles.content}>
          <Box sx={privacyPageStyles.hero}>
            <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
              {t("Legal.Privacy.privacyPolicy")}
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              {t("Legal.Privacy.policyExplanation")}
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

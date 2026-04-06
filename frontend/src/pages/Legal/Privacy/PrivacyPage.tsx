import { Box, Container, Typography } from "@mui/material";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { LegalSection } from "../components/LegalSection";
import { privacyPageStyles } from "./PrivacyPage.styles";

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect basic information such as your email address and job application data you choose to store within the app.",
  },
  {
    title: "Passwords",
    body: "We do not save any passwords whatsoever, eveyrthing happens with either google sign in or one time passwords via email.",
  },
  {
    title: "How We Use Your Information",
    body: "Your data is used solely to provide and improve your experience. We do not sell or share your data with third parties.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical measures to protect your data, though no system can guarantee absolute security.",
  },
];

export const PrivacyPage = () => {
  return (
    <Box sx={privacyPageStyles.root}>
      <Navbar />
      <Container maxWidth="md" sx={privacyPageStyles.container}>
        <Box sx={privacyPageStyles.content}>
          <Box sx={privacyPageStyles.hero}>
            <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              This policy explains how we collect, use, and protect your
              information when you use Job Trackr.
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

import { Box, Container, Typography } from "@mui/material";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { LegalSection } from "../components/LegalSection";
import { termsPageStyles } from "./TermsPage.styles";

const sections = [
  {
    title: "Use of Service",
    body: "Job Trackr is provided for personal use to help you track and manage your job applications in one place and is a personal project for skill growth.",
  },
  {
    title: "User Responsibilities",
    body: "You are responsible for the accuracy of the data you enter. Please ensure your information is up to date.",
  },
  {
    title: "Limitation of Liability",
    body: "We are not liable for any loss or damage resulting from your use of this application.",
  },
  {
    title: "Changes to Terms",
    body: "These terms may be updated at any time. Continued use of the service constitutes acceptance of any changes.",
  },
];

export const TermsPage = () => {
  return (
    <Box sx={termsPageStyles.root}>
      <Navbar />
      <Container maxWidth="md" sx={termsPageStyles.container}>
        <Box sx={termsPageStyles.content}>
          <Box sx={termsPageStyles.hero}>
            <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
              Terms of Service
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              By using Job Trackr, you agree to the following terms and
              conditions. Please read them carefully.
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

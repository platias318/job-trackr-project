import { Box, Container } from "@mui/material";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { AuthForm } from "./components/AuthForm/AuthForm";
import { HeroText } from "./components/HeroText/HeroText";
import { homePageStyles } from "./HomePage.styles";

export const HomePage = () => (
  <Box sx={homePageStyles.root}>
    <Navbar />
    <Container maxWidth="sm" sx={homePageStyles.container}>
      <Box sx={homePageStyles.content}>
        <HeroText />
        <AuthForm />
      </Box>
    </Container>
    <Footer />
  </Box>
);

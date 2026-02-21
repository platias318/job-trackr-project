import { Box, Container } from "@mui/material";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/NavBar";

import { AuthForm } from "./components/AuthForm";
import { MainPageText } from "./components/MainPageText";
import { homePageStyles } from "./HomePage.styles";

export const HomePage = () => (
  <Box sx={homePageStyles.root}>
    <Navbar />
    <Container maxWidth="sm" sx={homePageStyles.container}>
      <Box sx={homePageStyles.content}>
        <MainPageText />
        <AuthForm />
      </Box>
    </Container>
    <Footer />
  </Box>
);

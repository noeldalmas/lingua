// /src/LandingPage.jsx
import React from "react";
import { Container, Box, Typography, Button, Grid, Paper } from "@mui/material";
import HeroSection from "../components/HeroSection";
import LanguageOptions from "../components/LanguageOptions";
import ContentCategories from "../components/ContentCategories";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
      <HeroSection />
      <LanguageOptions />
      <ContentCategories />
      <Testimonials />
      <Footer />
    </Container>
  );
};

export default LandingPage;

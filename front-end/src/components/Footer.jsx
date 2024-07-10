// /src/components/Footer.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
        backgroundColor: "#3f51b5",
        color: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Join a community of language learners
      </Typography>
      <Button variant="contained" color="secondary" size="large">
        Get Started for Free
      </Button>
    </Box>
  );
};

export default Footer;

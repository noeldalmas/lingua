// /src/components/HeroSection.jsx
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", py: 10, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h2" gutterBottom>
        Learn Languages from Content You Love
      </Typography>
      <Typography variant="h5" gutterBottom>
        The fast, fun, and effective way to learn
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Get Started for Free
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;

// /src/components/LanguageOptions.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const languages = [
  "Swahili",
  "Kikuyu",
  "Lingala",
];

const LanguageOptions = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Available Languages
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {languages.map((language) => (
          <Grid item key={language}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{language}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LanguageOptions;

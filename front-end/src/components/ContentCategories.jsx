// /src/components/ContentCategories.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const categories = [
  "Books",
  "Podcasts",
  "News",
  "Business",
  "Entertainment",
  "Sports",
  "Technology",
  "Science",
  "Travel",
  "Politics",
  "Food",
  "Culture",
];

const ContentCategories = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom align="center">
        Learn from Your Favorite Content
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{category}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContentCategories;

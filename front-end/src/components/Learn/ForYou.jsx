// /src/components/Learn/ForYou.jsx
import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import LessonCard from "./LessonCard";

const recommendedLessons = [
  {
    id: 1,
    title: "Recommended 1",
    description: "Description 1",
    imageUrl: "/path/to/image1.jpg",
  },
  {
    id: 2,
    title: "Recommended 2",
    description: "Description 2",
    imageUrl: "/path/to/image2.jpg",
  },
  {
    id: 3,
    title: "Recommended 3",
    description: "Description 3",
    imageUrl: "/path/to/image3.jpg",
  },
  {
    id: 4,
    title: "Recommended 4",
    description: "Description 4",
    imageUrl: "/path/to/image4.jpg",
  },
  {
    id: 5,
    title: "Recommended 5",
    description: "Description 5",
    imageUrl: "/path/to/image5.jpg",
  },
];

const ForYou = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" gutterBottom>
        For You
      </Typography>
      <Grid container spacing={2}>
        {recommendedLessons.map((lesson) => (
          <Grid item key={lesson.id} xs={12} sm={6} md={4} lg={2.4}>
            <LessonCard {...lesson} />
          </Grid>
        ))}
      </Grid>
      <Button variant="text" sx={{ mt: 2 }}>
        View all
      </Button>
    </Box>
  );
};

export default ForYou;

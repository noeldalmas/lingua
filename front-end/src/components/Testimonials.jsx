// /src/components/Testimonials.jsx
import React from "react";
import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

const testimonials = [
  {
    name: "Danston Omwamba",
    location: "Kakamega, Kenya",
    text: "Lingua is my favourite online resource for language learning. Their gigantic library in different languages gives me the opportunity to build vocabulary with great material that includes audio and text.",
  },
  {
    name: "Maurine Tswani",
    location: "Cape Town, South Africa",
    text: "The Lingua system makes reading in your target language easy, efficient and effective. By highlighting words and phrases, your vocabulary and grammar knowledge improves naturally as you read.",
  },
  {
    name: "Jakaya Mpwaatu",
    location: "Ouaga, Burkina Faso",
    text: "I decided to sit the DELF B1 exam after a year of using Lingua, and I got the highest score among all the students who took the test!",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        What People Are Saying
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.name} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{testimonial.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {testimonial.location}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                "{testimonial.text}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;

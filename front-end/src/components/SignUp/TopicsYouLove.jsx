// /src/components/SignUp/TopicsYouLove.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpData } from "../../redux/actions/signUpActions";

const topics = [
  "Books",
  "Podcasts",
  "News",
  "Business",
  "Entertainment",
  "Sports",
  "Technology",
  "Pronunciation",
  "Grammar",
  "Health",
  "Science",
  "Culture",
  "Travel",
  "Politics",
  "Food",
  "Language",
  "Lifestyle",
  "Kids",
  "History",
  "Songs",
  "Language YouTubers",
];

const TopicsYouLove = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpData = useSelector((state) => state.signUp);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({}); // Added state for field errors

  useEffect(() => {
    setSelectedTopics(signUpData.topics);
  }, [signUpData]);

  const handleToggleTopic = (topic) => {
    setSelectedTopics((prev) => {
      const updatedTopics = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];
      if (updatedTopics.length >= 5) {
        setFieldErrors((errors) => ({ ...errors, topics: undefined }));
      }
      return updatedTopics;
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (selectedTopics.length < 5) {
      errors.topics = "Select 5 or more"; // Corrected error key to 'topics'
      isValid = false;
    }
    setFieldErrors(errors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      dispatch(updateSignUpData({ topics: selectedTopics }));
      navigate("/signup/import-content");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", textAlign: "center", py: 10 }}>
      <Typography variant="h4" gutterBottom>
        What Topics Do You Love?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choose 5 or more categories to customize your Lesson Feed
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} key={topic}>
            <Button
              variant={
                selectedTopics.includes(topic) ? "contained" : "outlined"
              }
              color="primary"
              fullWidth
              onClick={() => handleToggleTopic(topic)}
              sx={{ mt: 1 }}
            >
              {topic}
            </Button>
          </Grid>
        ))}
      </Grid>
      {fieldErrors.topics && (
        <Typography color="error" sx={{ mt: 2 }}>
          {fieldErrors.topics}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        sx={{ mt: 3, mx: 2 }}
      >
        Complete Sign Up
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/signup/daily-goal")}
        sx={{ mt: 3, mx: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default TopicsYouLove;

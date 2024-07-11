// /src/components/SignUp/DailyGoal.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpData } from "../../redux/actions/signUpActions";

const goals = [
  { label: "Casual", time: "10 Min/Day", coins: 50 },
  { label: "Steady", time: "20 Min/Day", coins: 100 },
  { label: "Keen", time: "40 Min/Day", coins: 200 },
  { label: "Intense", time: "60 Min/Day", coins: 400 },
];

const DailyGoal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpData = useSelector((state) => state.signUp);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setSelectedGoal(signUpData.dailyGoal);
  }, [signUpData]);

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!selectedGoal) {
      errors.goal = "This field is required";
      isValid = false;
    }
    setFieldErrors(errors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      dispatch(updateSignUpData({ dailyGoal: selectedGoal }));
      navigate("/signup/import-content");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center", py: 10 }}>
      <Typography variant="h4" gutterBottom>
        Choose A Daily Goal
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {goals.map((goal) => (
          <Grid item xs={12} key={goal.label}>
            <Button
              variant={selectedGoal === goal.label ? "contained" : "outlined"}
              color="primary"
              fullWidth
              onClick={() => setSelectedGoal(goal.label)}
              sx={{
                mt: 1
              }}
            >
              {goal.label}
              <br />
              {goal.time}
              <br />
              {goal.coins} Coins
            </Button>
          </Grid>
        ))}
      </Grid>
      {fieldErrors.goal && (
        <Typography color="error" sx={{ mt: 2 }}>
          {fieldErrors.goal}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        sx={{ mt: 3, mx: 2 }}
      >
        Continue
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/signup/native-language")}
        sx={{ mt: 3, mx: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default DailyGoal;

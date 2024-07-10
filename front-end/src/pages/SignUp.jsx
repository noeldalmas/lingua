// /src/pages/SignUp.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpData } from "../redux/actions/signUpActions";
import NativeLanguage from "../components/SignUp/NativeLanguage";
import DailyGoal from "../components/SignUp/DailyGoal";
import TopicsYouLove from "../components/SignUp/TopicsYouLove";
import ImportContent from "../components/SignUp/ImportContent";

const languages = ["Swahili", "Kikuyu", "Lingala"];

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpData = useSelector((state) => state.signUp);
  const [formData, setFormData] = useState({
    language: signUpData.language || "",
    level: signUpData.level || "",
    name: signUpData.name || "",
    email: signUpData.email || "",
    username: signUpData.username || "",
    password: signUpData.password || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = () => {
    dispatch(updateSignUpData(formData));
    navigate("/signup/native-language");
  };

  const handleCompleteSignUp = () => {
    // Finalize sign-up and navigate to Learn page
    dispatch(updateSignUpData(formData));
    navigate("/learn");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign Up!
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    label="I want to learn:"
                    margin="normal"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>
                        {lang}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    label="My level:"
                    margin="normal"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleCreateAccount}
                  >
                    Create Account
                  </Button>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <Button variant="outlined" color="primary" fullWidth>
                        Sign in with Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" color="primary" fullWidth>
                        Sign in with Google
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" color="primary" fullWidth>
                        Sign in with Apple
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="h6">
                    Already have an account?{" "}
                    <Button onClick={() => navigate("/login")}>Login</Button>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    By clicking this button you accept our{" "}
                    <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>. We will not share
                    your data with third parties and you will only receive
                    newsletters and notifications from Lingua.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <a href="#referral">Referral Code?</a>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        }
      />
      <Route path="/native-language" element={<NativeLanguage />} />
      <Route path="/daily-goal" element={<DailyGoal />} />
      <Route path="/topics-you-love" element={<TopicsYouLove />} />
      <Route
        path="/import-content"
        element={<ImportContent onCompleteSignUp={handleCompleteSignUp} />}
      />
    </Routes>
  );
};

export default SignUp;

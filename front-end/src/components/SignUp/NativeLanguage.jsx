// /src/components/SignUp/NativeLanguage.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, MenuItem, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpData } from "../../redux/actions/signUpActions";

const NativeLanguage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpData = useSelector((state) => state.signUp);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(signUpData.nativeLanguage);
  }, [signUpData]);

  const [fieldErrors, setFieldErrors] = useState({
    language: false,
  });

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!language) {
      errors.language = true;
      isValid = false;
    }
    setFieldErrors(errors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      dispatch(updateSignUpData({ nativeLanguage: language }));
      navigate("/signup/daily-goal");
    }
    
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center", py: 10 }}>
      <Typography variant="h4" gutterBottom>
        What Is Your Native Language?
      </Typography>
      <TextField
        select
        label="Choose your native language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        fullWidth
        sx={{ my: 2 }}
        required
        error={fieldErrors.language}
        helperText={fieldErrors.language ? "This field is required" : ""}
      >
        {["Swahili", "Kikuyu", "Lingala"].map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        sx={{ mx: 2 }}
      >
        Continue
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/signup")}
        sx={{ mx: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default NativeLanguage;

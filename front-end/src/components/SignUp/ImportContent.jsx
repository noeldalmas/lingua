// /src/components/SignUp/ImportContent.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSignUpData } from "../../redux/actions/signUpActions";

const ImportContent = ({ onCompleteSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = () => {
    // Save any final data and navigate to the dashboard
    dispatch(updateSignUpData({}));
    onCompleteSignUp();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center", py: 10 }}>
      <Typography variant="h4" gutterBottom>
        Import The Content You Love
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enable the Import Extension to import from your favourite browser. It
        only takes a minute!
      </Typography>
      <Box sx={{ my: 3 }}>
        <img
          src="/path/to/import-content.png"
          alt="Import Content"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Box>
      <Button variant="contained" color="primary" sx={{ mx: 2 }}>
        Install Extension
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mx: 2 }}
        onClick={handleContinue}
      >
        Skip/Continue
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/signup/topics-you-love")}
        sx={{ mx: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ImportContent;

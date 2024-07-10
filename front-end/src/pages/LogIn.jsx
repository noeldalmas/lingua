// /src/pages/LogIn.jsx
import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  return (
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
              Login
            </Typography>
            <TextField fullWidth label="Username or email" margin="normal" />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button color="secondary">Forgot Password?</Button>
            </Box>
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
              Don't have an account?{" "}
              <Button onClick={() => navigate("/signup")}>
                Create new account
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogIn;

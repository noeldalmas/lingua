// /src/components/Account.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const Account = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom>
          Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Username"
              value="titan2"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value="theinherenttitan@gmail.com"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Typography variant="body1">
              Member Since: March 04, 2024
            </Typography>
            <Typography variant="body1">Current Tier: FREE</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Change plan
            </Button>
            <Typography variant="body1">LingQs Limit: 20</Typography>
            <Typography variant="body1">Total LingQs: 1</Typography>
            <Typography variant="body1">Total Imports: 0</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="error" sx={{ mt: 3 }}>
          Delete your account
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Important: Deleting your account will delete all your personal and
          learning data.
        </Typography>
      </Box>
    </Container>
  );
};

export default Account;

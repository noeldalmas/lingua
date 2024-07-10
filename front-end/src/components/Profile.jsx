// /src/components/Profile.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              value="Titan"
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Time Zone</InputLabel>
              <Select value="Indian/Mauritius">
                <MenuItem value="Indian/Mauritius">Indian/Mauritius</MenuItem>
                {/* Add more timezones here */}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Timezone change notification"
            />
            <TextField fullWidth label="Skype Name" sx={{ mb: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Native Language</InputLabel>
              <Select value="English">
                <MenuItem value="English">English</MenuItem>
                {/* Add more native languages here */}
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<AddCircle />} sx={{ mb: 2 }}>
              Add More
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Change picture
                <input type="file" hidden />
              </Button>
              <TextField fullWidth multiline rows={4} label="Bio" />
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Tutoring Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" startIcon={<AddCircle />} sx={{ mb: 2 }}>
              Language
            </Button>
            <TextField
              fullWidth
              label="Conversation Rate ($/hour)"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Correction Rate (cents/word)"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" sx={{ mb: 2 }}>
              Add/Change Video
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <Button variant="outlined">Edit Calendar</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

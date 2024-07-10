// /src/pages/Settings.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircle,
  Person,
  Notifications,
  Star,
  People,
  Settings as SettingsIcon,
  Language,
  Receipt,
  MenuBook,
  Help,
  ExitToApp,
} from "@mui/icons-material";

const Settings = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", my: 5 }}>
      <Box sx={{ width: "20%", borderRight: "1px solid #ddd" }}>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Points" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Invite Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="App settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Languages" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ width: "80%", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Account
        </Typography>
        <TextField fullWidth label="Username" value="titan2" sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Email"
          value="theinherenttitan@gmail.com"
          sx={{ mb: 2 }}
        />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          sx={{ mb: 2 }}
        />
        <Box>
          <Typography variant="body1">Member Since: March 04, 2024</Typography>
          <Typography variant="body1">
            Current Tier: FREE{" "}
            <Button variant="contained" sx={{ ml: 1 }}>
              Change plan
            </Button>
          </Typography>
          <Typography variant="body1">LingQs Limit: 20</Typography>
          <Typography variant="body1">Total LingQs: 1</Typography>
          <Typography variant="body1">Total Imports: 0</Typography>
        </Box>
        <Button variant="contained" color="error" sx={{ mt: 3 }}>
          Delete your account
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;

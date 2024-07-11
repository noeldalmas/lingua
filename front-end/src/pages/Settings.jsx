// /src/pages/Settings.jsx
import React, { useState } from "react";
import {
  Container,
  Box,
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
import Profile from "../components/Profile";
import Account from "../components/Account";

const Settings = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <Account />;
      case 1:
        return <Profile />;
      case 2:
        return <div>Notifications Content</div>;
      case 3:
        return <div>Points Content</div>;
      case 4:
        return <div>Invite Friends Content</div>;
      case 5:
        return <div>App Settings Content</div>;
      case 6:
        return <div>General Content</div>;
      case 7:
        return <div>Languages Content</div>;
      case 8:
        return <div>Billing Content</div>;
      case 9:
        return <div>Help Content</div>;
      case 10:
        return <div>Log out Content</div>;
      default:
        return <Account />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", my: 5 }}>
      <Box
        sx={{
          width: "20%",
          borderRight: "1px solid #ddd",
          position: "fixed",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <List component="nav">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Points" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Invite Friends" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="App settings" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 7}
            onClick={(event) => handleListItemClick(event, 7)}
          >
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Languages" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 8}
            onClick={(event) => handleListItemClick(event, 8)}
          >
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 9}
            onClick={(event) => handleListItemClick(event, 9)}
          >
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 10}
            onClick={(event) => handleListItemClick(event, 10)}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ width: "80%", ml: "20%", p: 3 }}>{renderContent()}</Box>
    </Container>
  );
};

export default Settings;

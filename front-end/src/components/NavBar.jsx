// /src/components/NavigationBar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/");
  };

  // Do not render the navbar on the landing page, signup, or login page
  const noNavBarRoutes = ["/", "/signup", "/login"];
  if (noNavBarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lingua
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/learn")}>
            Lessons
          </Button>
          <Button color="inherit" onClick={() => navigate("/tutors")}>
            Tutors
          </Button>
          <Button color="inherit" onClick={() => navigate("/community")}>
            Community
          </Button>
          <Button color="inherit" endIcon={<ArrowDropDown />}>
            0/400 Coins
          </Button>
          <Button color="inherit" endIcon={<ArrowDropDown />}>
            EN
          </Button>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuClick("/settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("/notifications")}>
              Notifications
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("/points")}>
              Points
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("/invite-friends")}>
              Invite Friends
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

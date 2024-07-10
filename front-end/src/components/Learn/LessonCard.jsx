// /src/components/Learn/LessonCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Favorite,
  AddCircle,
  MoreVert,
  PlayCircleFilled,
  PlaylistAdd,
  BarChart,
  Share,
  Report,
} from "@mui/icons-material";

const LessonCard = ({ title, description, imageUrl }) => {
  const [hover, setHover] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", width: "100%" }}
    >
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box>
            <Badge
              color="secondary"
              badgeContent={
                <img
                  src="/path/to/youtube_icon.png"
                  alt="YouTube"
                  height="20"
                />
              }
            >
              <Typography variant="body2">647 New Words</Typography>
            </Badge>
            <Typography variant="body2">0 LingQs</Typography>
            <Typography variant="body2">0 Known Words</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <Favorite />
            </IconButton>
            <IconButton color="inherit">
              <AddCircle />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PlayCircleFilled fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View Course" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PlaylistAdd fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Remove from Continue Studying" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PlaylistAdd fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Add to Playlist" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <BarChart fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Lesson Stats" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Share fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Report fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default LessonCard;

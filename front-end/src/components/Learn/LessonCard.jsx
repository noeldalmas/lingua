import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Backdrop,
  Fade,
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
import YouTube from "react-youtube";

const LessonCard = ({ videoId, title, channelName, duration, score }) => {
  const [hover, setHover] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleCardClick}
        sx={{ position: "relative", width: "100%", cursor: "pointer" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Channel: {channelName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Duration: {duration}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Score: {score.toFixed(2)}
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
                onClick={(event) => event.stopPropagation()} // Ensure clicks inside the menu don't trigger the modal
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

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxHeight: "80vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
            }}
          >
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "450px" }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LessonCard;

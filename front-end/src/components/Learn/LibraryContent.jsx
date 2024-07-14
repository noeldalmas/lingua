// /src/components/Learn/LibraryContent.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Grid,
  Button,
  Menu,
  MenuItem,
  InputBase,
  IconButton,
  Slider,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import LessonCard from "./LessonCard";
import { searchAndFetchRecommendations } from "../../redux/actions/recommendationActions";

const LibraryContent = () => {
  const [importAnchorEl, setImportAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { recommendations, loading, error } = useSelector(
    (state) => state.recommendations
  );

  const handleImportClick = (event) => {
    setImportAnchorEl(event.currentTarget);
  };

  const handleImportClose = () => {
    setImportAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchAndFetchRecommendations({ query: searchQuery }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Paper
          component="form"
          sx={{ display: "flex", alignItems: "center", width: 300 }}
          onSubmit={handleSearchSubmit}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Paper>
        <Slider
          defaultValue={50}
          aria-labelledby="discrete-slider"
          step={10}
          marks={[
            { value: 0, label: "Beginner 1" },
            { value: 10, label: "Beginner 2" },
            { value: 20, label: "Intermediate 1" },
            { value: 30, label: "Intermediate 2" },
            { value: 40, label: "Advanced 1" },
            { value: 50, label: "Advanced 2" },
          ]}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          sx={{ width: "30%", mx: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleImportClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Import
        </Button>
        <Menu
          anchorEl={importAnchorEl}
          open={Boolean(importAnchorEl)}
          onClose={handleImportClose}
        >
          <MenuItem onClick={handleImportClose}>Lesson</MenuItem>
          <MenuItem onClick={handleImportClose}>Vocabulary</MenuItem>
          <MenuItem onClick={handleImportClose}>Ebook/File</MenuItem>
          <MenuItem onClick={handleImportClose}>Audio</MenuItem>
        </Menu>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Recommendations
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {recommendations.map((rec) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rec.videoId}>
                <LessonCard
                  videoId={rec.videoId}
                  title={rec.title}
                  channelName={rec.channelName}
                  duration={rec.duration}
                  score={rec.score}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default LibraryContent;

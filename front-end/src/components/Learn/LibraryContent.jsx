// /src/components/Learn/LibraryContent.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import ContinueStudying from "./ContinueStudying";
import ForYou from "./ForYou";
import Topics from "./Topics";

const LibraryContent = () => {
  const [importAnchorEl, setImportAnchorEl] = useState(null);

  const handleImportClick = (event) => {
    setImportAnchorEl(event.currentTarget);
  };

  const handleImportClose = () => {
    setImportAnchorEl(null);
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
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
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
      <ContinueStudying />
      <ForYou />
      <Topics />
    </Box>
  );
};

export default LibraryContent;

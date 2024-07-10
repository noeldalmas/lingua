// /src/pages/Learn.jsx
import React, { useState } from "react";
import { Container, Box, Tabs, Tab } from "@mui/material";
import LibraryContent from "../components/Learn/LibraryContent";
import PlaylistsContent from "../components/Learn/PlaylistsContent";
import VocabularyContent from "../components/Learn/VocabularyContent";

const Learn = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ px: 3, my: 5 }}>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Library Tabs"
        >
          <Tab label="Library" />
          <Tab label="Playlists" />
          <Tab label="Vocabulary" />
        </Tabs>
        {tabValue === 0 && <LibraryContent />}
        {tabValue === 1 && <PlaylistsContent />}
        {tabValue === 2 && <VocabularyContent />}
      </Box>
    </Container>
  );
};

export default Learn;

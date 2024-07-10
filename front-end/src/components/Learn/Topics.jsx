// /src/components/Learn/Topics.jsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LessonCard from "./LessonCard";

const topics = [
  {
    id: 1,
    title: "Technology",
    lessons: [
      {
        id: 1,
        title: "Tech Lesson 1",
        description: "Tech Description 1",
        imageUrl: "/path/to/image1.jpg",
      },
      {
        id: 2,
        title: "Tech Lesson 2",
        description: "Tech Description 2",
        imageUrl: "/path/to/image2.jpg",
      },
      {
        id: 3,
        title: "Tech Lesson 3",
        description: "Tech Description 3",
        imageUrl: "/path/to/image3.jpg",
      },
      {
        id: 4,
        title: "Tech Lesson 4",
        description: "Tech Description 4",
        imageUrl: "/path/to/image4.jpg",
      },
      {
        id: 5,
        title: "Tech Lesson 5",
        description: "Tech Description 5",
        imageUrl: "/path/to/image5.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Health",
    lessons: [
      {
        id: 1,
        title: "Health Lesson 1",
        description: "Health Description 1",
        imageUrl: "/path/to/image1.jpg",
      },
      {
        id: 2,
        title: "Health Lesson 2",
        description: "Health Description 2",
        imageUrl: "/path/to/image2.jpg",
      },
      {
        id: 3,
        title: "Health Lesson 3",
        description: "Health Description 3",
        imageUrl: "/path/to/image3.jpg",
      },
      {
        id: 4,
        title: "Health Lesson 4",
        description: "Health Description 4",
        imageUrl: "/path/to/image4.jpg",
      },
      {
        id: 5,
        title: "Health Lesson 5",
        description: "Health Description 5",
        imageUrl: "/path/to/image5.jpg",
      },
    ],
  },
];

const Topics = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" gutterBottom>
        Topics
      </Typography>
      <Grid container spacing={2}>
        {topics.map((topic) => (
          <Grid item key={topic.id} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {topic.title}
                </Typography>
                <Grid container spacing={2}>
                  {topic.lessons.map((lesson) => (
                    <Grid item key={lesson.id} xs={12} sm={6} md={4} lg={2.4}>
                      <LessonCard {...lesson} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Topics;

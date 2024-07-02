// src/components/Lesson/LessonDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/main.css";

const LessonDetail = ({ lessons }) => {
  const { id } = useParams();
  const lesson = lessons.find((lesson) => lesson.id === id);

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="lesson-detail">
      <h1>{lesson.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
};

export default LessonDetail;
